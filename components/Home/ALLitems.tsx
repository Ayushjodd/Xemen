
"use client";

import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import CardComp from "../shared/CardComp";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "./Loader";
import { useSession } from "next-auth/react";
import { SecondaryAppbar } from "../Appbar/SecondaryAppbar";

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
     <SecondaryAppbar/>
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
                  description={product.description.slice(0, 30) + "..."}
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