"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";
import Head from "next/head";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Inter } from "next/font/google";

const opFont = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const SignInPage: FC = () => {
  return (
    <div
      className={`${opFont.className} select-none absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] flex items-center justify-center`}
    >
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Head>
      <div className="px-8 py-16 rounded-lg shadow-xl w-full max-w-md border bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1 text-center">
          👋Welcome to <span className="text-3xl font-bold ">Xemen</span>
        </h1>
        <p className="text-gray-500 mb-6 border-b pb-4 text-center ">
          Choose a login method
        </p>
        <div className="space-y-4">
          <button
            onClick={async () =>
              await signIn("google", { callbackUrl: "/home" })
            }
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <FcGoogle className="mr-2 text-2xl bg-white rounded-sm " /> Continue
            with Google
          </button>
          <button
            onClick={async () =>
              await signIn("github", { callbackUrl: "/home" })
            }
            className="w-full flex items-center justify-center bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-950 transition duration-200"
          >
            <FaGithub className="mr-2 text-2xl" /> Continue with GitHub
          </button>
          <button
            onClick={async () =>
              await signIn("discord", { callbackUrl: "/home" })
            }
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            <FaDiscord className="mr-2 text-2xl" /> Continue with Discord
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
