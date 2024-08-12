"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/newButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import ShoppingCartIcon from "../icons/ShoppingCart";
import FilterIcon from "../icons/FilterIcon";
import SearchIcon from "../icons/SearchIcons";
import CardComp from "../shared/CardComp";

export default function AllComponent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality sound with noise cancellation",
      price: 99.99,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Smartwatch",
      description: "Tracks your fitness and sleep",
      price: 149.99,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      description: "Precise control for gaming",
      price: 59.99,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      description: "Durable and comfortable",
      price: 79.99,
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      description: "Powerful sound in a compact design",
      price: 89.99,
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "DSLR Camera",
      description: "Professional-grade photography",
      price: 799.99,
      image: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Fitness Tracker",
      description: "Monitor your daily activity",
      price: 49.99,
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Wireless Charging Pad",
      description: "Convenient and fast charging",
      price: 39.99,
      image: "/placeholder.svg",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-muted/40 min-h-screen">
      <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            Xemen
          </Link>
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full bg-background pl-10 pr-12 py-2 rounded-lg shadow-sm"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <FilterIcon className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <ShoppingCartIcon className="w-6 h-6 text-muted-foreground" />
            </Button>
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <CardComp
              key={product.id}
              url={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  //@ts-ignore
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  //@ts-ignore
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
