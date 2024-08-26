import FlagIcon from "../icons/FlagIcon"
import LockIcon from "../icons/LockIcon"
import PocketIcon from "../icons/PocketIcon"

export const Features=()=>{
    return(
        <>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful features that make our Solana
                  Marketplace the best choice for buying and selling.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <LockIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    Enjoy the security and transparency of the Solana blockchain
                    for all your transactions.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <PocketIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Instant Payments</h3>
                  <p className="text-muted-foreground">
                    Receive your payments instantly with the lightning-fast
                    Solana network.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FlagIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Low Transaction Fees</h3>
                  <p className="text-muted-foreground">
                    Benefit from the low fees and high scalability of the Solana
                    blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}