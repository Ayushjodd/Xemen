import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration =60;

export async function GET(
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
  
      const order = await prisma.order.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
            userId:true,
            user:{
                select:{
                    name:true,
                }
            },
            totalPrice:true,
            Orderstatus:true,
            createdAt:true,
            updatedAt:true,
            items:{
                select:{
                    product:{
                        select:{
                            title:true,
                            price:true,
                            description:true,
                            imageUrl:true,
                            category:true,
                            sellerName:true
                        }
                    },
                    productId:true,
                    quantity:true
                }
            }
        },
      });
  
      if (!order) {
        return NextResponse.json(
          { success: false, message: "Product dosent exists!" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        {
            id:order.id,
            userId:order.userId,
            customer:order.user.name,
            totalPrice: (( Number(order.totalPrice) / Number(BigInt(LAMPORTS_PER_SOL))).toFixed(2)).toString(),
            quantity:order.items.map((item)=>{
                return {
                    quantity:item.quantity,
                    sellerName:item.product.sellerName,
                    productTitle:item.product.title,
                    productDescription:item.product.description,
                    productImage:item.product.imageUrl,
                    productCategory:item.product.category,
                    productPrice: (Number(item.product.price)/Number(BigInt(LAMPORTS_PER_SOL))).toFixed(2)
                }
            }),
            orderStatus:order.Orderstatus,
            createdAt:order.createdAt,
            updatedAt:order.updatedAt,
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
  