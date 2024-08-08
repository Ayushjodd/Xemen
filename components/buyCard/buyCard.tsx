import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { JSX, SVGProps } from "react"   

export function BuyCard({productPrice, produtName, productDescription, productRating}: {productPrice: string, produtName: string, productDescription?: string, productRating: number}) {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <Image
        src="/placeholder.svg"
        alt="Product Image"
        width={600}
        height={400}
        className="w-full h-56 object-cover"
        style={{ aspectRatio: "600/400", objectFit: "cover" }}
      />
      <div className="p-4 bg-background">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{produtName || ""}</h3>
          <div className="text-3xl font-bold text-primary">{productPrice || ""}</div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: productRating || 3 }).map((i, index) => (
              <StarIcon key={index} className="w-4 h-4 fill-primary" />
            ))}
            {Array.from({ length: 5 - (productRating || 3) }).map((i, index) => (
              <StarIcon key={index} className="w-4 h-4 fill-muted stroke-muted-foreground" />
            ))}
          </div>
          <span>({productRating || 3})</span>
        </div>
        <div className="text-muted-foreground text-sm">{productDescription?.substring(0, 50) || ""}</div>
        <div className="mt-4 flex gap-2">
          <Button size="sm">Buy Now</Button>
          <Button size="sm" variant="outline">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
