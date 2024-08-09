/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/newButton";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center border rounded-full">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Solana Marketplace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className=" mr-11 mt-2">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-2"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-2"
              prefetch={false}
            >
              How It Works
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-2"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-2"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
          <button className=" bg-[#141c2e] hover:bg-[#272e3f] text-white rounded-md ml-96 p-2 px-4 ">
            Login
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Power of Solana Marketplace
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Buy and sell items securely on our decentralized platform
                    powered by Solana blockchain.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    List an Item
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Browse Listings
                  </Link>
                </div>
              </div>
              <img
                src="https://inmindsoftware.com/wp-content/uploads/2024/01/AdobeStock_524936362-1080x675.webp"
                width=""
                height=""
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Listings
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of the latest items listed on our Solana
                  Marketplace.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      width="200"
                      height="200"
                      alt="Item 1"
                      className="rounded-md"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold">Vintage Camera</h3>
                      <p className="text-muted-foreground">
                        Fully functional 35mm film camera
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          className="h-6 w-6"
                        />
                        <span className="font-bold">1.5 SOL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src="https://i.pinimg.com/236x/d5/07/92/d50792dd3cecd96029801316fc8dbb62.jpg"
                      width="200"
                      height="200"
                      alt="Item 2"
                      className="rounded-md"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold">Vintage Typewriter</h3>
                      <p className="text-muted-foreground">
                        Fully restored 1950s typewriter
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          className="h-6 w-6"
                        />
                        <span className="font-bold">2.0 SOL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src="https://i.pinimg.com/236x/96/62/ef/9662efab555ca8bc2d25a971e8ebd914.jpg"
                      width="200"
                      height="200"
                      alt="Item 3"
                      className="rounded-md"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold">
                        Vintage Vinyl Record
                      </h3>
                      <p className="text-muted-foreground">
                        Rare 1970s vinyl record in mint condition
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          className="h-6 w-6"
                        />
                        <span className="font-bold">0.8 SOL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful features that make our Solana
                  Marketplace the best choice for buying and selling.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <LockIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    Enjoy the security and transparency of the Solana blockchain
                    for all your transactions.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <PocketIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Instant Payments</h3>
                  <p className="text-muted-foreground">
                    Receive your payments instantly with the lightning-fast
                    Solana network.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FlagIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Low Transaction Fees</h3>
                  <p className="text-muted-foreground">
                    Benefit from the low fees and high scalability of the Solana
                    blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Benefits for Buyers and Sellers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover why our Solana Marketplace is the best choice for
                  both buyers and sellers.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ShoppingBasketIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Benefits for Buyers</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Access to a wide range of unique items</li>
                    <li>Secure and transparent transactions</li>
                    <li>Fast and reliable payment processing</li>
                    <li>Buyer protection and dispute resolution</li>
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <StoreIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Benefits for Sellers</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Reach a global audience of buyers</li>
                    <li>Low transaction fees and fast payouts</li>
                    <li>Easy-to-use listing and management tools</li>
                    <li>Seller protection and dispute resolution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow these simple steps to start buying and selling on our
                  Solana Marketplace.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <NetworkIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Connect your Solana wallet to our platform to start buying
                    and selling.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ListIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">List Your Item</h3>
                  <p className="text-muted-foreground">
                    Create a listing for your item with all the necessary
                    details.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ShoppingCartIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Buy or Sell</h3>
                  <p className="text-muted-foreground">
                    Browse the marketplace, make offers, and complete
                    transactions securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Marketplace</h3>
            <Link href="#" prefetch={false}>
              Browse Listings
            </Link>
            <Link href="#" prefetch={false}>
              List an Item
            </Link>
            <Link href="#" prefetch={false}>
              Seller Dashboard
            </Link>
            <Link href="#" prefetch={false}>
              Buyer Dashboard
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">About</h3>
            <Link href="#" prefetch={false}>
              Our Story
            </Link>
            <Link href="#" prefetch={false}>
              Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              Press
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Help Center
            </Link>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Documentation
            </Link>
            <Link href="#" prefetch={false} />
          </div>
        </div>
      </footer>
    </div>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function ListIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function NetworkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function PocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
      <polyline points="8 10 12 14 16 10" />
    </svg>
  );
}

function ShoppingBasketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function StoreIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
