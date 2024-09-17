"use client";
import Appbar from "../Appbar/Appbar";
import { useEffect, useState } from "react";
import { ProfileSkeleton } from "../shared/ProfileSkeleton";

interface Details {
  name: string;
  username: string;
  provider: string;
  createdAtDate: string;
  createdAtTime: string;
  solWallets: number;
  productsListed: number;
  orderedProducts: number;
  carts: number;
}

export const Profile = () => {
  const [userDetails, setUserDetails] = useState<Details | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        const data = await res.json();

        if (data.success) {
          setUserDetails(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        alert("Failed to fetch user");
      } finally {
      }
    };

    fetchUser();
  }, []);

  if (!userDetails) {
    return (
      <>
        <div className="mt-10 mx-10 md:mx-14 lg:mx-20">
          <Appbar />
        </div>
        Kindly Login
      </>
    );
  }

  return (
    <>
      <div>
        <div className="mt-10 mx-12 md:mx-14 lg:mx-20 ">
          <Appbar />
        </div>
        <div className="flex flex-col items-center mt-10 mb-7 overflow-hidden h-screen">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Your Profile</h1>
          </div>
          <div className="flex flex-col border bg-gray-50 dark:bg-transparent shadow-lg rounded-lg px-6 py-5 w-[60%] my-4 gap-5 relative">
            <h2>Name: {userDetails?.name}</h2>
            <p className="inline break-all">Username: {userDetails.username}</p>

            <p className="inline break-all">Provider: {userDetails.provider}</p>
            <p>
              Created At: {userDetails.createdAtDate} ,{" "}
              {userDetails.createdAtTime}
            </p>
            <p>SolWallets Owned: {userDetails.solWallets}</p>
            <p>Orders Created: {userDetails.orderedProducts}</p>
            <p>Products Listed: {userDetails.productsListed}</p>
            <p>Active Cart: {userDetails.carts}</p>
          </div>
        </div>
      </div>
    </>
  );
};
