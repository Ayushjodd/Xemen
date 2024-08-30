import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 403 }
        );
      }

      const userId = session.user.uid;

      if(!userId) {
        return NextResponse.json(
            { success: false, message: 'Invalid User Id' },
            { status: 404 }
          );
      }

      const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            solWallet:true,
            products:true,
            orders:true,
            cart:true
        }
      })
      
      if(!user) {
        return NextResponse.json(
            { success: false, message: 'Invalid User' },
            { status: 404 }
          );
      }

      const solWallets = new Array(user?.solWallet).length
      const productsListed = user?.products.length;
      const orderedProducts = user.orders.length;
      const Carts = new Array(user?.cart).length

      return NextResponse.json ({
        success:true,
        name: user.name,
        username:user.username,
        provider:user.provider,
        createdAtDate: user.createdAt.toLocaleDateString(),
        createdAtTime:user.createdAt.toLocaleTimeString(),
        solWallets:solWallets,
        productsListed,
        orderedProducts,
        carts:Carts
      })


    }catch (error) {
        console.error('Failed to fetch the user:', error);
        return NextResponse.json(
          { success: false, message: 'Failed to fetch the user' },
          { status: 500 }
        );
      }
}