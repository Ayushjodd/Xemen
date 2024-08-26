import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.uid;

        const sollWallet = await prisma.solWallet.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!sollWallet) {
            return NextResponse.json(
                { success: false, message: "Wallet not found!" },
                { status: 404 }
            );
        }

        
        const balanceResponse = await fetch("https://api.devnet.solana.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [sollWallet.publicKey],
            }),
        });

        const balanceData = await balanceResponse.json();

        if (!balanceData.result) {
            return NextResponse.json(
                { success: false, message: "Failed to fetch balance" },
                { status: 500 }
            );
        }

        const balanceLamports = balanceData.result.value;

        return NextResponse.json({
            status: true,
            id: sollWallet.id,
            publicKey: sollWallet.publicKey,
            privateKey: sollWallet.privateKey,
            balance: (balanceLamports / LAMPORTS_PER_SOL).toFixed(2), // Convert Lamports to SOL
            userId: sollWallet.userId,
        },{
            status: 200
        });
    } catch (error) {
        console.error("Error fetching wallet details:", error);
        return NextResponse.json(
            { success: false, message: "Error! Cannot fetch Wallet details" },
            { status: 500 }
        );
    }
}
