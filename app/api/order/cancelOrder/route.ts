import { authOptions } from '@/app/lib/auth';
import prisma from '@/db/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order || order.Orderstatus !== 'Pending') {
      return NextResponse.json(
        { success: false, message: 'Order not found or not cancellable' },
        { status: 403 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { Orderstatus: 'Cancelled' },
    });

    return NextResponse.json(
      { success: true, order: updatedOrder.Orderstatus },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { success: false, message: 'Error cancelling order' },
      { status: 500 }
    );
  }
}
