/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SkeletonCard } from "./Loader";
import { signOut, useSession } from "next-auth/react";

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
  const router = useRouter();
  const [user,setUser] = useState(false);
  const session = useSession();

  useEffect(()=>{
    if(session.data?.user){
      setUser(true);
    }
    else{
      setUser(false);
    }
  },[session]);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-muted/40 min-h-screen">
      <header className="bg-background shadow-sm sticky top-0 z-10 p-2">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            <img
              className="rounded-lg border hover:border-1 hover:border-black"
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 border cursor-pointer hover:bg-gray-400 ">
                  <AvatarImage
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    alt="User Avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              {
                user?
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onSelect={() => console.log("Profile selected")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={async() => 
                    await signOut()
                  }
                >
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/list-an-item")}>
                  List Item
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/wallet")}>
                  Wallet
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/")}>
                  Home
                </DropdownMenuItem>
              </DropdownMenuContent>
              :
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onSelect={() => 
                    router.push("/signin")
                  }
                >
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/")}>
                  Home
                </DropdownMenuItem>
              </DropdownMenuContent>
}
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? // Show skeleton loaders if loading
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : currentItems.map((product) => (
                <CardComp
                  productId={product.id.toString()}
                  key={product.id}
                  url={product.imageUrl}
                  title={product.title}
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