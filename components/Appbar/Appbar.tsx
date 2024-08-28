/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MountainIcon from "../icons/Mountain";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaWallet, FaShoppingCart, FaHeadphonesAlt } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react"; 
import UserImage from "./UserImage";

export default function Appbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <header className="px-2 lg:px-4 h-14 flex items-center justify-between border rounded-full">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Solana Marketplace</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 px-2" prefetch={false}>
            <div className="pr-2 lg:pr-4 flex items-center">
              <BsBox /> <span className="pl-2">Orders</span>
            </div>
          </Link>
          <Link href="/wallet" className="text-sm font-medium hover:underline underline-offset-4 px-2" prefetch={false}>
            <div className="pr-2 lg:pr-4 flex items-center">
              <FaWallet /> <span className="pl-2">Wallet</span>
            </div>
          </Link>
          <Link href="/cart" className="text-sm font-medium hover:underline underline-offset-4 px-2" prefetch={false}>
            <div className="pr-2 lg:pr-4 flex items-center">
              <FaShoppingCart /> <span className="pl-2">Cart</span>
            </div>
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 px-2" prefetch={false}>
            <div className="pr-2 lg:pr-4 flex items-center">
              <FaHeadphonesAlt /> <span className="pl-2">Contact Us</span>
            </div>
          </Link>
        </nav>

        <div className="flex items-center">
          {!user ? (
            <button
              className="bg-[#141c2e] hover:bg-[#272e3f] text-white rounded-md p-2 px-4"
              onClick={() => {
                router.push("/signin");
              }}
            >
              Login
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center p-2 rounded-full bg-[#141c2e] text-white hover:bg-[#272e3f]">
                  {!session?.user?.image ? (
                    <UserRound size={24} />
                  ) : (
                    <UserImage image={session?.user.image} />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:shadow-[#030712] translate-y-8 scale-110 -translate-x-10 shadow-lg bg-white">
                <DropdownMenuLabel className="flex gap-4 items-center">
                  <div className="!w-[2rem] flex items-center p-[0.2rem] justify-center !h-[2rem]">
                    {!session?.user?.image ? (
                      <UserRound size={24} />
                    ) : (
                      <UserImage image={session?.user.image} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="max-w-[200px]">{session?.user?.name}</span>
                    <span className="text-[0.8rem] max-w-[200px] text-gray-400">
                      {session?.user?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="flex gap-2 cursor-pointer text-black/70 hover:text-black transition"
                  onClick={() => router.push('/profile')}
                >
                  <span><UserRound size={15} /></span>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 cursor-pointer text-black/70 hover:text-black transition"
                  onClick={handleLogout}
                >
                  <MdLogout size={15} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            className="ml-4 sm:hidden text-sm font-medium hover:underline underline-offset-4 px-2"
            onClick={() => {} /* Implement mobile menu toggle if needed */}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
