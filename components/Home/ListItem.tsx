/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/newButton";

interface Listing {
  name: string;
  description: string;
  price: number;
  image: File | null;
}

export default function ListAnItem() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [newListing, setNewListing] = useState<Listing>({
    name: "",
    description: "",
    price: 0,
    image: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewListing({
      ...newListing,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewListing({
        ...newListing,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListings([...listings, newListing]);
    setNewListing({
      name: "",
      description: "",
      price: 0,
      image: null,
    });
  };

  const renderImageUrl = (image: File | null) => {
    return image ? URL.createObjectURL(image) : "/placeholder.svg";
  };

  return (
    <div className="container mx-auto py-8 bg-gray-">
      <h1 className="text-3xl font-bold mb-6 border-b text-center pb-2 text-green-600">
        List an Item for Sale
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="border rounded-lg shadow-lg">
          <form
            className="bg-background p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Product Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={newListing.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newListing.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-medium mb-2">
                Price (in Solana)
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={newListing.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-medium mb-2">
                Upload Image
              </label>
              <Input
                type="file"
                id="image"
                name="image"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Sell
            </Button>
          </form>
        </div>
        <div className="border rounded-lg p-2 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Active Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <div
                key={index}
                className="bg-background p-4 rounded-lg shadow-md"
              >
                <img
                  src={renderImageUrl(listing.image)}
                  alt={listing.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{listing.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {listing.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-primary font-bold">
                      {listing.price} SOL
                    </div>
                    <Button>Buy</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
