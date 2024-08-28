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

    const { orderId, message } = await req.json();

const order = await prisma.order.findUnique({
    where:{
        id:orderId
    }
});

if(order?.Orderstatus!=='Pending'){
    return NextResponse.json({ success: false, message: 'Order should be pending' }, { status: 403 });
}

    if (message.toLowerCase() !== 'received') {
      return NextResponse.json({ success: false, message: 'Invalid message' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { Orderstatus: 'Delievered' }, 
    });

    return NextResponse.json({ success: true, order: updatedOrder.Orderstatus}, { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ success: false, message: 'Error updating order status' }, { status: 500 });
  }
}
