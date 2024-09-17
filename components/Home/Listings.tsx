/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/newButton";

const listings = [
  {
    id: "1",
    imageUrl: "https://m.media-amazon.com/images/I/61RJn0ofUsL._SX679_.jpg",
    title: "Macbook pro M3",
    description: "The best laptop out there",
    price: "130 SOL",
    link: "https://xemen.vercel.app/product/70f8e17f-f345-47c0-99e7-821da3d8a22a",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1695822822491-d92cee704368?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Iphone 15 pro max",
    description: "Best performance all-rounder",
    price: "6.25 SOL",
    link: "https://xemen.vercel.app/product/c1b62b77-1437-46d1-b24c-a411955e7581",
  },
  {
    id: "3",
    imageUrl:
      "https://www.louisvuitton.com/images/is/image/lv/M_BC_NewFormalSS25_AOU24_04_DII.jpg?wid=2400",
    title: "LV CLOTHING",
    description: "Luxury clothing",
    price: "27 SOL",
    link: "https://xemen.vercel.app/product/e95b175d-d250-4293-9e8b-427e8eebcd4f",
  },
];

export const Listings = () => {
  const router = useRouter();

  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Featured Listings
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Check out some of the latest items listed on our Solana Marketplace.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <img
                  src={listing.imageUrl}
                  width="200"
                  height="200"
                  alt={listing.title}
                  className="rounded-md"
                  style={{ aspectRatio: "200/200", objectFit: "cover" }}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold">{listing.title}</h3>
                  <p className="text-muted-foreground">{listing.description}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                      className="h-6 w-6"
                      alt="Solana logo"
                    />
                    <span className="font-bold">{listing.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    router.push(listing.link);
                  }}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
