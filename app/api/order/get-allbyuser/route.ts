import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const dynamic = 'force-dynamic';
export const maxDuration =60;

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

    const userId  = session.user?.uid;

    const orders = await prisma.order.findMany({
      where: {
        userId:userId
      },
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
        totalPrice: true,
        Orderstatus: true,
        createdAt: true,
        updatedAt: true,
        items: {
          select: {
            product: {
              select: {
                title: true,
                price: true,
                description: true,
                imageUrl: true,
                category: true,
                sellerName: true,
              },
            },
            productId: true,
            quantity: true,
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => {
      return {
        id: order.id,
        userId: order.userId,
        customer: order.user.name,
        totalPrice: (Number(order.totalPrice) / Number(BigInt(LAMPORTS_PER_SOL))).toFixed(2).toString(),
        quantity: order.items.map((item) => {
          return {
            quantity: item.quantity,
            sellerName: item.product.sellerName,
            productTitle: item.product.title,
            productDescription: item.product.description,
            productImage: item.product.imageUrl,
            productCategory: item.product.category,
            productPrice: (Number(item.product.price) / Number(BigInt(LAMPORTS_PER_SOL))).toFixed(2),
          };
        }),
        orderStatus: order.Orderstatus,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    });

    return NextResponse.json(
      {
        success: true,
        orders: formattedOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
