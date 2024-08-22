/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/newButton";
import Link from "next/link";
import React from "react";
import HeartIcon from "../icons/HeartIcon";
import StarIcon from "../icons/StarIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

export default function CardProduct() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/list-item">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Acme Prism T-Shirt</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <Carousel className="rounded-lg overflow-hidden">
              <CarouselContent>
                {[1, 2, 3].map((_, index) => (
                  <CarouselItem key={index}>
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Product Image"
                      width={800}
                      height={800}
                      className="object-cover w-full h-[400px] md:h-[600px] rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                      style={{ aspectRatio: "800/800", objectFit: "cover" }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-background/50 rounded-full p-2 hover:bg-background/75 transition-colors">
                <ChevronLeftIcon className="w-6 h-6 text-foreground" />
              </CarouselPrevious>
              <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-background/50 rounded-full p-2 hover:bg-background/75 transition-colors">
                <ChevronRightIcon className="w-6 h-6 text-foreground" />
              </CarouselNext>
            </Carousel>
          </div>
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Acme Prism T-Shirt
              </h1>
              <p className="text-muted-foreground">The Cozy Chromatic Blend</p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((_, index) => (
                    <StarIcon key={index} className="w-5 h-5 fill-primary" />
                  ))}
                  {[4, 5].map((_, index) => (
                    <StarIcon
                      key={index}
                      className="w-5 h-5 fill-muted stroke-muted-foreground"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.3)</span>
              </div>
              <div className="text-4xl font-bold flex ">
                <span>
                  <img
                    className="h-10 w-10 mr-1 "
                    src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                  />
                </span>
                <span className="hover:underline">0.4</span>
              </div>
              <div className="text-sm leading-loose text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                reiciendis dicta sit similique odio vero corrupti fugit. Ad
                aspernatur suscipit quae molestias, maxime, inventore voluptatem
                officiis iste voluptate amet esse!
              </div>
              <div className="flex gap-2">
                <Button size="lg">Add to Cart</Button>
                <Button size="lg" variant="outline">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
