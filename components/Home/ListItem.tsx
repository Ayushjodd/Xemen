"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "react-hot-toast";
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
import Appbar from "../Appbar/Appbar";

interface Listing {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ListAnItem() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [newListing, setNewListing] = useState<Listing>({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
  });
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewListing({
      ...newListing,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (category: string) => {
    setNewListing({
      ...newListing,
      category: category,
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
      "i"
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
        body: JSON.stringify(newListing),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product successfully listed!");
        setListings([...listings, newListing]);
        setNewListing({
          title: "",
          description: "",
          price: 0,
          imageUrl: "",
          category: "",
        });
      } else {
        setApiError(result.message || "Failed to list item.");
        toast.error(result.message || "Failed to list item.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setApiError("Failed to list item.");
      toast.error("Failed to list item.");
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <div className="mt-10  flex flex-col mx-64">
          <Appbar />
        </div>
        <div className="flex justify-center mt-40"></div>
        <div className="container mx-auto">
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
                    id="title"
                    name="title"
                    value={newListing.title}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block font-medium mb-2"
                  >
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
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block font-medium mb-2">
                    Category
                  </label>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Tools">Tools</SelectItem>
                        <SelectItem value="Groceries">Groceries</SelectItem>
                        <SelectItem value="NFT">NFT</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                    min="0"
                    step="any"
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
                <Button
                  type="submit"
                  className="w-full bg-green-600 text-white hover:bg-green-700 rounded-lg py-2 focus:outline-none focus:ring-4 focus:ring-green-400"
                >
                  List Item
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
