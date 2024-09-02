import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          &copy; 2024 Solana Marketplace. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-sm"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-sm"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-sm"
            prefetch={false}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};