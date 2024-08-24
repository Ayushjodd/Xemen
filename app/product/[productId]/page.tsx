//app/product/[productId]/page.tsx

/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/${productId}`
        );
        const data = await response.json();
        if (data) {
          setProduct(data);
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
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <Toaster />
      <div className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/list-item">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.title}</BreadcrumbPage>
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
                <Button size="lg" className="" onClick={handleAddToCart}>
                  Add to Cart
                </Button>

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