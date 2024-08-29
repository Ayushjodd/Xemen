"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id } = context.params;

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        category: true,
        sellerName: true,
        sellerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product dosent exists!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        id: product.id,
        title: product.title,
        description: product.description,
        price: (
          Number(product.price) / Number(BigInt(LAMPORTS_PER_SOL))
        ).toFixed(2),
        imageUrl: product.imageUrl,
        category: product.category,
        sellerName: product.sellerName,
        sellerId: product.sellerId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
