/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import SearchIcon from "../icons/SearchIcons";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/newButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";

export const SecondaryAppbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const session = useSession();
  const RiyalUser = session.data?.user;
  const image = RiyalUser?.image || "";

  useEffect(() => {
    if (session.data?.user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [session]);
  return (
    <>
      <header className=" sticky top-0 z-10 p-2 bg-[#] border-b">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link href="/" className="" prefetch={false}>
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-3xl sm:text-4xl md:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Xemen
            </span>
          </Link>
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hidden md:block" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full bg-background pl-10 pr-12 py-2 rounded-lg shadow-sm hidden md:block"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/");
              }}
            >
              <span className="text-2xl text-[#64748b] ">
                {" "}
                <FaHome />
              </span>
            </Button>

            <Button
              className="hidden md:block"
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/profile");
              }}
            >
              <span className="text-2xl text-[#64748b] ">
                {" "}
                <UserRound scale={15} />
              </span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/cart");
              }}
            >
              <span className="text-2xl text-[#64748b] ">
                {" "}
                <FaShoppingCart />
              </span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/wallet");
              }}
            >
              <span className="text-xl text-[#64748b] ">
                {" "}
                <FaWallet />
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9  cursor-pointer hover:border-[#64748b] border-2 transition-all ml-5">
                  <AvatarImage src={image} alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              {user ? (
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => router.push("/")}>
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={async () => await signOut()}>
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => router.push("/list-an-item")}
                  >
                    List Item
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/wallet")}>
                    Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/all-items")}>
                    All Items
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => router.push("/signin")}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/")}>
                    Home
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};
