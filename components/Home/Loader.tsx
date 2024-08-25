import React from "react";
import ReactLoading from "react-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="spin" color="[#ffffff]" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[350px] w-[300px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
