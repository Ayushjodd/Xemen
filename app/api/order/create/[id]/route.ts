"use server";

import prisma from '@/db/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth"; 
import { NextRequest, NextResponse } from 'next/server';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function POST(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = context.params;

    if (!id || typeof id !== 'string') {
        return NextResponse.json(
            { error: 'Product ID is required' },
            { status: 400 }
        );
    }

    try {
        const userId = session.user?.uid;

        const product = await prisma.product.findUnique({
            where: { id: id },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        const { quantity } : { quantity: number } = await req.json();

    
        const productPriceInSol = Number(product.price) / Number(LAMPORTS_PER_SOL);
        

        const totalPriceInSol = productPriceInSol * quantity;


        const totalPrice = BigInt(Math.round(totalPriceInSol * Number(LAMPORTS_PER_SOL)));

        const order = await prisma.order.create({
            data: {
                userId,
                totalPrice, 
                Orderstatus: 'Pending', 
                items: {
                    create: {
                        productId: product.id,
                        quantity: quantity,
                    },
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });



        const orderItem = await prisma.orderItem.findFirst({
            where:{
               orderId:order.items[0].orderId
            }
        })

        return NextResponse.json(
            { success: true, message: 'Order created successfully', 
                id:order.id,
                userId:order.userId,
                quantity:orderItem?.quantity,
                totalPrice: (( Number(order.totalPrice) / Number(BigInt(LAMPORTS_PER_SOL))).toFixed(2)).toString(),
                productId:orderItem?.productId,
                orderedStatus:order.Orderstatus,
                createdAt:order.createdAt,
                updatedAt:order.updatedAt
             },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
