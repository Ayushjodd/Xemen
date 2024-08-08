import { BuyCard } from "@/components/Home/buyCard";
import Landing from "@/components/Home/Landing";

export default function Home() {
  return (
    <>
    <Landing/>
    <main className="flex min-h-screen flex-col items-center px-10 pt-10 pb-8">
    <div>
      <BuyCard 
      productName="Wireless Headphones" 
      productPrice="$99" 
      productRating={3} 
      productDescription="High-quality audio with noise cancellation" />
    </div>
    </main>
    </>
  );
}
