

import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gray-900 text-white text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-800/50 to-transparent"></div>
      
      <h1 className="text-9xl font-bold text-blue-500 drop-shadow-lg z-10">404</h1>
      <p className="text-2xl mt-4 z-10">Oops! Page not found.</p>
      <Link href="/" passHref className="mt-8 px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out z-10 cursor-pointer">
          Go Back to Home 
      </Link>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-gray-900"></div>
    </div>
  );
};

export default Custom404;
