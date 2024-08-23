import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import prisma from '@/db/db';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.uid;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true, 
      },
    });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }

    const cartItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        return {
          ...item,
          product: product ? { id: product.id, name: product.title,  price: (
            Number(product.price) / Number(BigInt(LAMPORTS_PER_SOL))
          ).toFixed(2), } : null,
        };
      })
    );

    return NextResponse.json({
      success: true,
      cart: {
        id: cart.id,
        items: cartItems,
      },
    });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve cart' },
      { status: 500 }
    );
  }
}
