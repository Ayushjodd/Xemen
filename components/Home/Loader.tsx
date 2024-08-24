import React from "react";
import ReactLoading from "react-loading";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="spin" color="[#ffffff]" />
    </div>
  );
}
