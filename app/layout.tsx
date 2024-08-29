import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xemen",
  description: "Xemen is a web3 solana ecommerce site where people can come and buy products by solana or they can list a product for selling in solana.Xemen also provides a wallet for their users .Xemen supports solana adding from solana and real time solana transaction from buyers to sellers.It is built with next js,tailwind css,react js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
