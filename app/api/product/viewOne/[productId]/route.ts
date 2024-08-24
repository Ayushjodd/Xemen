//app/api/product/viewOne/[productId]/route.ts
//deleted app/list-item/page.tsx
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const serializedProduct = {
      ...product,

      price: (Number(product.price) / Number(BigInt(LAMPORTS_PER_SOL))).toFixed(
        2
      ),
    };

    return NextResponse.json({ success: true, product: serializedProduct });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve product" },
      { status: 500 }
    );
  }
}
