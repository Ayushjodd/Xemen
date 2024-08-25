/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/newButton";
import toast, { Toaster } from "react-hot-toast";
import { RxUpdate } from "react-icons/rx";
import { GoArrowRight } from "react-icons/go";
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
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
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
        // Update the frontend state to remove the item
        setCart((prevCart) =>
          prevCart.filter((item) => item.product?.id !== id)
        );
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateQuantityInDB = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/add/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();

      if (data.success) {
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
        <div className="justify-between flex">
          <div className="mb-8">
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
          <div>
            <Button
              onClick={() => router.push("/all-items")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse more products{" "}
              <span className="text-xl pl-1">
                <GoArrowRight />
              </span>
            </Button>
          </div>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr_150px] items-center gap-4 border rounded-md p-3"
              >
                <img
                  src={item.product?.imageUrl}
                  alt={item.product.name}
                  width={125}
                  height={125}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium text-lg">{item.product.name}</h3>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                      className="h-5 w-5 mr-1"
                      alt="img"
                    />
                    {item.product.price}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2 mb-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          Math.max(item.quantity - 1, 1)
                        )
                      }
                      className="p-2 rounded-full"
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
                      className="p-2 rounded-full"
                    >
                      <PlusIcon className="h-4 w-4 " />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantityInDB(item.product?.id, item.quantity)
                    }
                    className="w-full md:w-auto p-2"
                  >
                    Update Quantity{" "}
                    <span className="text-lg ml-1">
                      <RxUpdate />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromCart(item.product?.id)}
                    className="mt-2 w-full md:w-auto px-5 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                  >
                    Remove Item
                    <TrashIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h3 className="font-medium text-lg">Total</h3>
              <span className="font-medium flex items-center">
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
