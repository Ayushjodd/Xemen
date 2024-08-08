import { BuyCard } from "@/components/buyCard/buyCard";
import Landing from "@/components/Dashboard/Landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-10 pt-10 pb-8">
    <div>
      <BuyCard 
      produtName="Wireless Headphones" 
      productPrice="$99" 
      productRating={3} 
      productDescription="High-quality audio with noise cancellation" />
    </div>
    </main>
  );
}
