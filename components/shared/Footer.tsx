import Link from "next/link"

export const Footer=()=>{
    return(
        <>
           <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Marketplace</h3>
            <Link href="#" prefetch={false}>
              Browse Listings
            </Link>
            <Link href="#" prefetch={false}>
              List an Item
            </Link>
            <Link href="#" prefetch={false}>
              Seller Dashboard
            </Link>
            <Link href="#" prefetch={false}>
              Buyer Dashboard
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">About</h3>
            <Link href="#" prefetch={false}>
              Our Story
            </Link>
            <Link href="#" prefetch={false}>
              Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              Press
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Help Center
            </Link>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Documentation
            </Link>
            <Link href="#" prefetch={false} />
          </div>
        </div>
      </footer>
        </>
    )
}