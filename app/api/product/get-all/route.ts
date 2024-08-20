"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function GET() {
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

    const products = await prisma.product.findMany({
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

    const formatedProducts = products.map((product) => {
      return {
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
      };
    });

    return NextResponse.json(
      {
        success: true,
        products: formatedProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch all products" },
      { status: 500 }
    );
  }
}
