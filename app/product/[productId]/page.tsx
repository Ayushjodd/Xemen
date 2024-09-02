/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/newButton";
import toast, { Toaster } from "react-hot-toast";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Loader from "@/components/Home/Loader";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import Appbar from "@/components/Appbar/Appbar";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  sellerName: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderResponse {
  success: boolean;
  message?: string;
}

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [addCart, setAddCart] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${productId}`);
        const data = await response.json();
        if (data) {
          setProduct(data);
          setLoading(false);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`/api/cart/add/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Item added to cart");
        setAddCart(true);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch(`/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Item Removed from cart");
        setAddCart(false);
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };
  const handleBuyNow = async () => {
    try {
      const response = await axios.post<OrderResponse>(
        `/api/order/create/${productId}`,
        { quantity }
      );

      if (response.data.success) {
        toast.success("Order placed successfully");
        await router.push("/orders");
        // Optionally handle successful order, e.g., redirect or update state
      } else {
        toast.error(
          response.data.message?.toString() || "Failed to place order"
        );
      }
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(String(error.response.data.message));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div>Please wait while we are fetching the details of the product</div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="bg-background">
        <div className="mt-10 mx-10 md:mx-14 lg:mx-20">
          <Appbar />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-semibold text-lg" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="font-semibold text-lg"
                  href="/all-items"
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-lg">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="w-full h-auto md:h-[600px] overflow-hidden rounded-md">
              <img
                className="object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                src={product.imageUrl}
                alt={product.title}
              />
            </div>

            <div className="grid gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {product.title}
                </h1>
                <p className="text-muted-foreground">Product Category</p> <br />
                <p>
                  <Badge className="rounded-2xl bg-[#ebbd5d] text-black hover:bg-[#ebbd5d] ">
                    {product.category}
                  </Badge>
                </p>
                <Button
                  className="mt-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                  onClick={() => router.push("/cart")}
                >
                  Go to Cart
                  <span className="text-lg pl-1">
                    <FaShoppingCart />
                  </span>
                </Button>
              </div>
              <div className="text-4xl font-bold flex items-center">
                <img
                  className="h-10 w-10 mr-1"
                  src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                  alt="Solana Logo"
                />
                <span>{product.price} SOL /quantity</span>
              </div>
              <div className="text-sm leading-loose text-muted-foreground">
                {product.description}
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-md p-2 text-center w-full md:w-auto"
                />
                {!addCart ? (
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={handleRemoveFromCart}
                  >
                    Remove from Cart
                  </Button>
                )}
                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  variant="outline"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
