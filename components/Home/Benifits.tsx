import ShoppingBasketIcon from "../icons/ShoppingBasket"
import StoreIcon from "../icons/StoreIcon"

export const Benifits=()=>{
    return(
        <>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Benefits for Buyers and Sellers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover why our Solana Marketplace is the best choice for
                  both buyers and sellers.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ShoppingBasketIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Benefits for Buyers</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Access to a wide range of unique items</li>
                    <li>Secure and transparent transactions</li>
                    <li>Fast and reliable payment processing</li>
                    <li>Buyer protection and dispute resolution</li>
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <StoreIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Benefits for Sellers</h3>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Reach a global audience of buyers</li>
                    <li>Low transaction fees and fast payouts</li>
                    <li>Easy-to-use listing and management tools</li>
                    <li>Seller protection and dispute resolution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}