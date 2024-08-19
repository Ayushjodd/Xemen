"use server"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth"; 
import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function POST(req: NextRequest) {
    try {
       
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const sellerId = session.user.uid;
        const username = session.user.name;

       
        const {
            title,
            description,
            price,
            imageUrl,
            category
        }: {
            title: string;
            description: string;
            price: number;
            imageUrl: string;
            category: string;
        } = await req.json();

       const priceLamports = Math.round(price * LAMPORTS_PER_SOL);

        const product = await prisma.product.create({
            data: {
                title,
                description,
                price:priceLamports,
                imageUrl,
                category,
                sellerName:username,
                seller: {
                    connect: {
                        id: sellerId,
                    },
                },
            },
        });

        const productWithStringBigInt = {
            ...product,
            price: product.price.toString(),
        };

        return NextResponse.json({ success: true, product: productWithStringBigInt });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create product" },
            { status: 500 }
        );
    }
}