/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
import { useRouter } from "next/navigation";

export default function AllComponent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality sound with noise cancellation",
      price: 99.99,
      image:
        "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Smartwatch",
      description: "Tracks your fitness and sleep",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1591147810559-9ae8cc24c862?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      description: "Precise control for gaming",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1628832306751-ec751454119c?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      description: "Durable and comfortable",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1667411424598-96b5e5f3139b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      description: "Powerful sound in a compact design",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1507878566509-a0dbe19677a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "DSLR Camera",
      description: "Professional-grade photography",
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1533246860975-b290a87773d3?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      name: "Fitness Tracker",
      description: "Monitor your daily activity",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      name: "Wireless Charging Pad",
      description: "Convenient and fast charging",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1677870367958-11dd9592089d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);
  const router = useRouter();
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
      <header className="bg-background shadow-sm sticky top-0 z-10 p-2">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            <img
              className="rounded-lg border hover:border-1  hover:border-black"
              width={197}
              src="https://pbs.twimg.com/media/GVNAwakWgAAnSHP?format=png&name=small"
            />
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
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/cart");
              }}
            >
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
