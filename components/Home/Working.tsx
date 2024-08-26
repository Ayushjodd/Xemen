import ListIcon from "../icons/ListIcon"
import NetworkIcon from "../icons/NetworkIcon"
import ShoppingCartIcon from "../icons/ShoppingCart"

export const Working=()=>{
    return(
        <>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow these simple steps to start buying and selling on our
                  Solana Marketplace.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <NetworkIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Get your Solana wallet from our platform to start buying
                    and selling.Add sol from solana faucet
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ListIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">List Your Item</h3>
                  <p className="text-muted-foreground">
                    Create a listing for your item with all the necessary
                    details.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ShoppingCartIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Buy or Sell</h3>
                  <p className="text-muted-foreground">
                    Browse the marketplace, make offers, and complete
                    transactions securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}