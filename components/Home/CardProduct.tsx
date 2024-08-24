//comp/home/cardProduct.tsx
/* eslint-disable @next/next/no-img-element */
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/newButton";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/viewOne/${productId}`
        );
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
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

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
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
              <p className="text-muted-foreground">Product Category</p>
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
              <Button size="lg">Add to Cart</Button>
              <Button size="lg" variant="outline">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
