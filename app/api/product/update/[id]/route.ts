"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
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

    const { id } = context.params;

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product dosent exists!" },
        { status: 404 }
      );
    }

    const {
      title,
      description,
      price,
      imageUrl,
      category,
    }: {
      title: string;
      description: string;
      price: number;
      imageUrl: string;
      category: string;
    } = await req.json();

    const priceLamports = Math.round(price * LAMPORTS_PER_SOL);

    const isUpdated =
      product.title !== title ||
      product.description !== description ||
      Number(product.price) !== priceLamports ||
      product.imageUrl !== imageUrl ||
      product.category !== category;

    if (!isUpdated) {
      return NextResponse.json(
        { success: false, message: "No changes detected" },
        { status: 400 }
      );
    }

    const Updatedproduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        title,
        description,
        price: priceLamports,
        imageUrl,
        category,
        sellerName: username,
        seller: {
          connect: {
            id: sellerId,
          },
        },
      },
    });

    const productWithStringBigInt = {
      ...Updatedproduct,
      price: Updatedproduct.price.toString(),
    };

    return NextResponse.json({
      success: true,
      message:"Product details updated successfully",
      product: productWithStringBigInt,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}
