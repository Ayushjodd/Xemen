import { Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import prisma from '@/db/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Utility function to convert base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

const connection = new Connection("https://api.devnet.solana.com");

export async function POST(req: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params;

    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const userId = session.user?.uid;

        // Fetch product and seller's SolWallet
        const product = await prisma.product.findUnique({
            where: { id: id },
            include: { 
                seller: {
                    include: { solWallet: true }
                }
            }
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const { quantity }: { quantity: number } = await req.json();

        if (quantity <= 0) {
            return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
        }

        const productPriceInSol = Number(product.price) / Number(LAMPORTS_PER_SOL);
        const totalPriceInSol = productPriceInSol * quantity;
        const totalPriceLamports = BigInt(Math.round(totalPriceInSol * Number(LAMPORTS_PER_SOL)));

        // Fetch buyer's SolWallet
        const buyerSolWallet = await prisma.solWallet.findUnique({
            where: { userId: userId }
        });

        if (!buyerSolWallet) {
            return NextResponse.json({ error: 'Buyer SolWallet not found' }, { status: 404 });
        }

        const balanceResponse = await fetch("https://api.devnet.solana.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [buyerSolWallet.publicKey],
            }),
        });

        const balanceData = await balanceResponse.json();

        if (!balanceData.result) {
            return NextResponse.json(
                { success: false, message: "Failed to fetch balance" },
                { status: 500 }
            );
        }

        const balanceLamports = balanceData.result.value;

     // Calculate totalPriceLamports correctly using BigInt for precision
const TotalPriceLamports = BigInt(Math.round(totalPriceInSol * Number(LAMPORTS_PER_SOL)));

// Check if buyer has sufficient balance in Lamports
if (BigInt(balanceLamports) < TotalPriceLamports) {
    return NextResponse.json({ success: false, message: "Insufficient Balance" }, { status: 411 });
}

        if (!product.seller.solWallet) {
            return NextResponse.json({ error: 'Seller SolWallet not found' }, { status: 404 });
        }

        // Extract public keys
        const buyerPublicKey = new PublicKey(buyerSolWallet.publicKey);
        const sellerPublicKey = new PublicKey(product.seller.solWallet.publicKey);

        // Load the buyer's keypair
        const buyerKeypair = Keypair.fromSecretKey(
            base64ToUint8Array(buyerSolWallet.privateKey)
        );

        // Create the transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: buyerPublicKey,
                toPubkey: sellerPublicKey,
                lamports: totalPriceLamports,
            })
        );

        try {
            // Start transaction and confirm it
            const signature = await sendAndConfirmTransaction(connection, transaction, [buyerKeypair]);

            // Create the order in the database
            const order = await prisma.order.create({
                data: {
                    userId,
                    totalPrice: totalPriceLamports,
                    Orderstatus: 'Pending',
                    items: {
                        create: {
                            productId: product.id,
                            quantity: quantity,
                        },
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            return NextResponse.json({
                success: true,
                message: 'Order created and payment processed successfully',
                id: order.id,
                transactionSignature: signature,
                userId: order.userId,
                quantity: order.items[0].quantity,
                totalPrice: (Number(order.totalPrice) / Number(LAMPORTS_PER_SOL)).toFixed(2),
                payed:(Number(totalPriceLamports) / Number(LAMPORTS_PER_SOL)).toFixed(2),
                productId: order.items[0].productId,
                orderedStatus: 'Completed',
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }, { status: 200 });

        } catch (error: any) {
            console.error('Transaction failed:', error.message);
            return NextResponse.json(
                { success: false, error: 'Transaction failed: ' + error.message },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('Error creating order or processing payment:', error.message);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
