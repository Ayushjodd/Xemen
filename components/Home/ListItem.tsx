/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/newButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Listing {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ListAnItem() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [newListing, setNewListing] = useState<Listing>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewListing({
      ...newListing,
      [e.target.name]: e.target.value,
    });
  };

  const validateImageUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );
    return !!urlPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateImageUrl(newListing.imageUrl)) {
      setImageUrlError("Please enter a valid image URL.");
      return;
    }

    setImageUrlError(null);

    try {
      const response = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newListing.name,
          description: newListing.description,
          price: newListing.price,
          imageUrl: newListing.imageUrl,
          category: "default-category", // Adjust as needed
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Item listed successfully!");
        setListings([...listings, newListing]);
        setNewListing({
          name: "",
          description: "",
          price: 0,
          imageUrl: "",
        });
      } else {
        setApiError(result.message || "Failed to list item.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setApiError("Failed to list item.");
    }
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="container mx-auto py-8 ">
        <h1 className="text-3xl font-bold mb-20 border-b text-center pb-2 text-green-600">
          List an Item for Sale
        </h1>
        <div className="mx-auto max-w-2xl">
          <div className="border rounded-lg shadow-lg">
            <form
              className="bg-white p-6 rounded-lg shadow-md"
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
                  className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
                  className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block font-medium mb-2"
                  >
                    Category
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="apple">Electronics</SelectItem>
                        <SelectItem value="banana">Clothing</SelectItem>
                        <SelectItem value="blueberry">Toys</SelectItem>
                        <SelectItem value="grapes">Groceries</SelectItem>
                        <SelectItem value="pineapple">Shoes</SelectItem>
                        <SelectItem value="pineapple">Watch</SelectItem>
                        <SelectItem value="pineapple">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
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
                  className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  min="0" // kahi to dalla -ve mai input dede💀
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block font-medium mb-2">
                  Image URL
                </label>
                <Input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={newListing.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                {imageUrlError && (
                  <p className="text-red-500 text-sm mt-1">{imageUrlError}</p>
                )}
              </div>
              {apiError && (
                <p className="text-red-500 text-sm mb-4">{apiError}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-sm mb-4">{successMessage}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 rounded-lg py-2"
              >
                List Item
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
