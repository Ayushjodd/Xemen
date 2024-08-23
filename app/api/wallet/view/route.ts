import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {success:false,message:"Unauthorized"},
                {status:401}
            )
        }

        const userId=session.user.uid;

        const sollWallet = await prisma.solWallet.findUnique({
            where:{
                userId:userId
            }
        })

        if(!sollWallet){
            return NextResponse.json(
                {success:false,message:"Wallet not found!"},
                {status:404}
            )
        }

        return NextResponse.json({
            status:true,
            id:sollWallet.id,
            publicKey:sollWallet.publicKey,
            privateKey:sollWallet.privateKey,
            balance: (
                Number(sollWallet.balance) / Number(BigInt(LAMPORTS_PER_SOL))
              ).toFixed(2),
            userId:sollWallet.userId
        },{
            status:200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {success:false,message:"Error! Cannot fetch Wallet details"},
            {status:500}
        )
    }
}