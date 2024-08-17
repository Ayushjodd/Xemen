/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "../ui/newButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";
import CircleCheckIcon from "../icons/CircleCheckIcon";

export default function Component() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cozy Blanket",
      image:
        "https://images.unsplash.com/photo-1676582846890-16cd2c0b7584?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Autumn Mug",
      image:
        "https://plus.unsplash.com/premium_photo-1673422506808-ad558246598a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 12.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      image:
        "https://plus.unsplash.com/premium_photo-1666632470596-d5d237620996?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 16.99,
      quantity: 1,
    },
  ]);
  const [showSolanaModal, setShowSolanaModal] = useState(false);
  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8">
        <div className="grid gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[100px_1fr_100px] items-center gap-4 border rounded-md p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-muted-foreground text-sm flex">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                    className="h-5 w-5 mr-1"
                    alt="img"
                  />
                  {item.price.toFixed(2)}
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
  );
}
