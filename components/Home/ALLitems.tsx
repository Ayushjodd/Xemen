"use client";

import { useState, useEffect } from "react";
import CardComp from "../shared/CardComp";
import { SkeletonCard } from "./Loader";
import { useSession } from "next-auth/react";
import { SecondaryAppbar } from "../Appbar/SecondaryAppbar";
import { Button } from "../ui/newButton";

interface Product {
  id: number;
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

export default function AllItems() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session.data?.user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [session]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/product/get-all");
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setFilterMenuOpen(false);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-muted/40 min-h-screen">
      <SecondaryAppbar />
      <main className="container mx-auto px-4 md:px-6 py-4">
        {/* Filter Buttons for large screens */}
        <div className="hidden sm:flex justify-center gap-4 mb-4">
          {["all", "Electronics", "Fashion", "Tools", "Groceries", "NFT", "Others"].map((category) => (
            <Button
              variant="ghost"
              key={category}
              className={`px-4 py-2 ${selectedCategory === category ? "bg-blue-500 text-white" : "text-gray-700"}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Filter Button for small screens */}
        <div className="flex justify-center sm:hidden mb-4">
          <Button
            variant="ghost"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 text-gray-700"
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
          >
            Filter
          </Button>
        </div>

        {/* Filter Menu for small screens */}
        {filterMenuOpen && (
          <div className="sm:hidden bg-white border rounded-lg shadow-lg p-4 mb-4">
            <nav className="flex flex-col gap-2">
              {["all", "Electronics", "Fashion", "Tools", "Groceries", "NFT", "Others"].map((category) => (
                <Button
                  variant="ghost"
                  key={category}
                  className={`px-4 py-2 ${selectedCategory === category ? "bg-blue-500 text-white" : "text-gray-700"}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </nav>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
            : currentItems.map((product) => (
                <CardComp
                  productId={product.id.toString()}
                  key={product.id}
                  url={product.imageUrl}
                  title={product.title}
                  description={product.description.slice(0, 30) + "..."}
                  price={product.price}
                  category={product.category}
                />
              ))}
        </div>
      </main>
    </div>
  );
}
