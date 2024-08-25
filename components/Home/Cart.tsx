/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/newButton";
import toast, { Toaster } from "react-hot-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: string;
  };
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSolanaModal, setShowSolanaModal] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart/view");
        const data = await response.json();

        if (data.success) {
          setCart(data.cart.items);
        } else {
          toast.error(data.message || "Failed to load cart");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (id: string) => {
    try {
      const response = await fetch(`/api/cart/remove/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setCart(cart.filter((item) => item.id !== id));
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();

      if (data.success) {
        setCart(
          cart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
        toast.success("Quantity updated");
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
    0
  );

  interface CartItem {
    id: string;
    product: {
      id: string;
      name: string;
      price: string;
      imageUrl?: string;
    };
    quantity: number;
  }

  return (
    <>
      <Toaster />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 ">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-semibold text-xl" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="font-semibold text-xl"
                  href="/all-items"
                >
                  All Items
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-xl">
                  Your Cart
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[100px_1fr_100px] items-center gap-4 border rounded-md p-3"
              >
                <img
                  src={item.product?.imageUrl}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-muted-foreground text-sm flex">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                      className="h-5 w-5 mr-1"
                      alt="img"
                    />
                    {item.product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Total</h3>
              <span className="font-medium flex ">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                  className="h-6 w-6 mr-1"
                  alt="img"
                />
                {totalAmount.toFixed(2)}
              </span>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 transition-all text-lg"
              size="lg"
              onClick={() => setShowSolanaModal(true)}
            >
              Pay via Solana
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
