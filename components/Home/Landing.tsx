"use client";
import Appbar from "../Appbar/Appbar";
import { Footer } from "../shared/Footer";
import { Working } from "./Working";
import { Benifits } from "./Benifits";
import { Features } from "./Features";
import { Listings } from "./Listings";
import { Main } from "./Main";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Appbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <Main />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <Listings />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <Features />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <Benifits />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <Working />
        </section>
      </main>
      <Footer />
    </div>
  );
}
