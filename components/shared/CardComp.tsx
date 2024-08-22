/* eslint-disable @next/next/no-img-element */

import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/newButton";

export default function CardComp(props: any) {
  return (
    <Card className="transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <img
          src={props.url}
          width="200"
          height="200"
          alt="Item 1"
          className="rounded-md"
          style={{ aspectRatio: "200/200", objectFit: "cover" }}
        />
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold">{props.title}</h3>
          <p className="text-muted-foreground">{props.description}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
              className="h-6 w-6"
              alt="img"
            />
            <span className="font-bold">{props.price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Buy Now</Button>
      </CardFooter>
    </Card>
  );
}
