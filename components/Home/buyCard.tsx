import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/newButton";
import Headphones from '../icons/Headphohe'; // Make sure this path is correct
import { StarIcon } from "@radix-ui/react-icons";

export function BuyCard({ productPrice, productName, productDescription, productRating }: { productPrice: string, productName: string, productDescription?: string, productRating: number }) {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="w-full h-56 flex items-center justify-center bg-gray-100">
        <Headphones width={200} height={200} className="object-cover" />
      </div>
      <div className="p-4 bg-background">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{productName || ""}</h3>
          <div className="text-3xl font-bold text-primary">{productPrice || ""}</div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: productRating || 3 }).map((_, index) => (
              <StarIcon key={index} className="w-4 h-4 fill-primary" />
            ))}
            {Array.from({ length: 5 - (productRating || 3) }).map((_, index) => (
              <StarIcon key={index} className="w-4 h-4 fill-muted stroke-muted-foreground" />
            ))}
          </div>
          <span>({productRating || 3})</span>
        </div>
        <div className="text-muted-foreground text-sm">{productDescription?.substring(0, 50) || ""}</div>
        <div className="mt-4 flex gap-2">
          <Button size="sm">Buy Now</Button>
          <Button size="sm" variant="outline">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
