/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

"use client"
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
    return(
        <>
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
                router.push("/");
              }}
            >
            <span className="text-2xl text-[#64748b] hover:text-black">  <FaHome/></span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/cart");
              }}
            >
               <span className="text-2xl text-[#64748b] hover:text-black">  <FaShoppingCart/></span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                router.push("/wallet");
              }}
            >
            <span className="text-xl text-[#64748b] hover:text-black">  <FaWallet/></span>
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
        </>
    )
}