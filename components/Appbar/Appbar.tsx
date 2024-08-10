/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import MountainIcon from "../icons/Mountain";

export default function Appbar () {
   const router=useRouter();

return <div>
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
<button className=" bg-[#141c2e] hover:bg-[#272e3f] text-white rounded-md ml-96 p-2 px-4 " onClick={()=>{
  router.push("/signin")
}}>
  Login
</button>
</nav>
</header>
</div>
}