/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/newButton";

interface CardProps {
  title: string;
  description: string;
  price: string;
  url: string;
  productId: string;
}

export default function CardComp({
  title,
  description,
  price,
  url,
  productId,
}: CardProps) {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push(`/product/${productId}`);
  };

  return (
    <Card className="flex flex-col h-full transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      <CardContent className="flex flex-col items-center justify-between p-6 flex-grow">
        <img
          src={url}
          width="200"
          height="200"
          alt={title}
          className="rounded-md"
          style={{ aspectRatio: "200/200", objectFit: "cover" }}
        />
        <div className="mt-4 text-center flex flex-col flex-grow">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          <div className="mt-auto flex items-center justify-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
              className="h-6 w-6"
              alt="Solana Logo"
            />
            <span className="font-bold">{price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleBuyNowClick} className="w-full">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
