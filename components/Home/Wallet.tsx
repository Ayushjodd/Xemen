import { Button } from "@/components/ui/newButton";
import CopyIcon from "../icons/CopyIcon";

export default function Wallet() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col gap-6 max-w-md w-full border ">
        <div>
          <h2 className="text-2xl font-bold">Your Wallet</h2>
          <p className="text-muted-foreground">
            Manage your Solana wallet and view your transaction history.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Public Key:</span>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono">
                5Ht7uDscKAQ4Ht7uDscKAQ4Ht7uDscKAQ4
              </code>
              <Button variant="ghost" size="icon">
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy public key</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Private Key:</span>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono">
                *****************************
              </code>
              <Button variant="ghost" size="icon">
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy private key</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">View Transactions</Button>
          <Button>Withdraw Funds</Button>
        </div>
      </div>
    </div>
  );
}
