"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product dosent exists!" },
        { status: 404 }
      );
    }

    const deletedProduct = await prisma.product.delete({
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

    const productWithStringBigInt = {
      ...deletedProduct,
      price: deletedProduct.price.toString(),
    };

    return NextResponse.json(
      {
        productWithStringBigInt,
        message: "Product Deleted Successfully",
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
