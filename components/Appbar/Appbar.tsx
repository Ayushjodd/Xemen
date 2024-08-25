/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MountainIcon from "../icons/Mountain";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border rounded-full">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Solana Marketplace</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 sm:gap-6">
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex bg-[#141c2e] hover:bg-[#272e3f] text-white rounded-md p-2 px-4">
                  Logout{" "}
                  <span className="text-2xl pl-1 text-red-500">
                    <MdLogout />
                  </span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <button
            className="ml-4 md:hidden text-sm font-medium hover:underline underline-offset-4 px-2"
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
        <div className="md:hidden mt-2 bg-white border rounded-lg shadow-lg p-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              How It Works
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 px-4"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
