/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiSolana } from "react-icons/si";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import {
  FaWallet,
  FaShoppingCart,
  FaHeadphonesAlt,
  FaHome,
} from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import UserImage from "./UserImage";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaPen } from "react-icons/fa6";

export default function Appbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="px-2 lg:px-4 h-14 flex items-center justify-between border rounded-full">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <SiSolana className="h-6 w-6" />
          <span className="sr-only">Solana Marketplace</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
          <Link
            href="/orders"
            className="text-sm font-medium hover:underline underline-offset-4 px-2"
            prefetch={false}
          >
            <div className="pr-2 lg:pr-4 flex items-center">
              <BsBox /> <span className="pl-2">Orders</span>
            </div>
          </Link>
          <Link
            href="/wallet"
            className="text-sm font-medium hover:underline underline-offset-4 px-2"
            prefetch={false}
          >
            <div className="pr-2 lg:pr-4 flex items-center">
              <FaWallet /> <span className="pl-2">Wallet</span>
            </div>
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium hover:underline underline-offset-4 px-2"
            prefetch={false}
          >
            <div className="pr-2 lg:pr-4 flex items-center">
              <FaShoppingCart /> <span className="pl-2">Cart</span>
            </div>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline underline-offset-4 px-2"
            prefetch={false}
          >
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
                <button className="flex items-center  rounded-full   ">
                  {!session?.user?.image ? (
                    <UserRound size={24} />
                  ) : (
                    <UserImage image={session?.user.image} />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:shadow-[#030712] translate-y-8 scale-110 -translate-x-10 shadow-lg bg-white">
                <DropdownMenuLabel className="flex gap-4 items-center">
                  <div className=" flex items-center  justify-center ">
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
                  onClick={() => router.push("/")}
                >
                  <FaHome />
                  <span>Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 cursor-pointer text-black/70 hover:text-black transition"
                  onClick={() => router.push("/profile")}
                >
                  <UserRound size={15}/>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 cursor-pointer text-black/70 hover:text-black transition"
                  onClick={() => router.push("/all-items")}
                >
                  <MdOutlineProductionQuantityLimits />
                  <span>All Items</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 cursor-pointer text-black/70 hover:text-black transition"
                  onClick={() => router.push("/list-an-item")}
                >
                  <FaPen />
                  <span>List an Item</span>
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
            onClick={toggleMenu}
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
      {menuOpen && (
        <div className="sm:hidden mt-2 bg-white border rounded-lg shadow-lg p-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/orders"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              <span className="flex items-center">
                Orders{" "}
                <span className="px-2">
                  <BsBox />
                </span>
              </span>
            </Link>
            <Link
              href="/wallet"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              <span className="flex items-center">
                Wallet{" "}
                <span className="px-2">
                  <FaWallet />
                </span>
              </span>
            </Link>
            <Link
              href="/cart"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              <span className="flex items-center">
                Cart{" "}
                <span className="px-2">
                  <FaShoppingCart />
                </span>
              </span>
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              <span className="flex items-center">
                Contact Us{" "}
                <span className="px-2">
                  <FaHeadphonesAlt />
                </span>
              </span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
