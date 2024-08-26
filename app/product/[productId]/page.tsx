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

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();
  const [loading, setLoading] = useState<Boolean>(true);
  const [addCart, setAddCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/${productId}`
        );
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
      const response = await fetch(
        `http://localhost:3000/api/cart/add/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: 1 }),
        }
      );

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
      const response = await fetch(
        `http://localhost:3000/api/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 ">
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
            <div className="w-full h-[400px] md:h-[600px] overflow-hidden rounded-md">
              <img
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
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
                <p>{product.category}</p>
                <Button
                  className="mt-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                  onClick={() => router.push("/cart")}
                >
                  Go to Cart
                  <span className=" text-lg pl-1">
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
                <span>{product.price} SOL</span>
              </div>
              <div className="text-sm leading-loose text-muted-foreground">
                {product.description}
              </div>
              <div className="flex gap-2">
                {!addCart ? (
                  <Button size="lg" className="" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button size="lg" className="" onClick={handleRemoveFromCart}>
                    Remove from Cart
                  </Button>
                )}
                <Button size="lg" variant="outline">
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
