import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import prisma from '@/db/db';

export async function POST(req: NextRequest, context: { params: { productId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId } = context.params;
    const { quantity } = await req.json();
    const userId = session.user.uid;

    if (!productId || quantity <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID or quantity' },
        { status: 400 }
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
        data: { quantity: quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json({ success: true, message: 'Product quantity updated' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}
