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
import FilterIcon from "../icons/FilterIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SecondaryAppbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const session = useSession();
  const RiyalUser = session.data?.user;
  const image = RiyalUser?.image || "";
  console.log(image);
  console.log(RiyalUser);

  useEffect(() => {
    if (session.data?.user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [session]);
  return (
    <>
      <header className="bg-background shadow-sm sticky top-0 z-10 p-2">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            <img
              className="rounded-full hover:border-1"
              width={200}
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
                router.push("/");
              }}
            >
              <span className="text-2xl text-[#64748b] ">
                {" "}
                <FaHome />
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
                  <DropdownMenuItem onSelect={() => router.push("/all-items")}>
                    All Items
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
