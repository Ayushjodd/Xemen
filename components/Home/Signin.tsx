"use client"

import { signIn } from "next-auth/react";
import { FC } from "react";
import Head from "next/head";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

const SignInPage: FC = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In</h1>
          <p className="text-gray-600 mb-6">Choose a login method</p>
          <div className="space-y-4">
            <button
              onClick={async() => await signIn("google",{callbackUrl:"/home"})}
              className="w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
            <button
              onClick={async() =>await signIn("github",{callbackUrl:"/home"})}
              className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
            >
              <FaGithub className="mr-2" /> Sign in with GitHub
            </button>
            <button
              onClick={async() =>await signIn("discord",{callbackUrl:"/home"})}
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <FaDiscord className="mr-2" /> Sign in with Discord
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
