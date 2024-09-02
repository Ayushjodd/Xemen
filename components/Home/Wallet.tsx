"use client";
import { Button } from "@/components/ui/newButton";
import { FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Appbar from "../Appbar/Appbar";
import { useRouter } from "next/navigation";

interface Wallet {
  id: string;
  publicKey: string;
  privateKey: string;
  balance: string;
  userId: string;
}

export default function Wallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);
   const router = useRouter();

  useEffect(() => {
    const fetchWallet = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/wallet/view");
        const data = await res.json();

        if (data.status) {
          setWallet(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch wallet", error);
        alert("Failed to fetch wallet");
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyNotification("Copied!");
      setTimeout(() => setCopyNotification(null), 2000); // Hide notification after 2 seconds
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!wallet) {
    return <div>No Wallet data available</div>;
  }

  return (
    <div className="overflow-hidden h-screen flex flex-col mb-8">
    <div className="mt-10 mx-10 md:mx-14 lg:mx-20">
      <Appbar/>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
        <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col gap-6 max-w-md w-full border relative">
          <div>
            <h2 className="text-2xl font-bold">Your Wallet</h2>
            <p className="text-muted-foreground">
              Manage your Solana wallet and view your transaction history.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-muted-foreground">Public Key:</span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono break-all">
                  {wallet?.publicKey}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(wallet.publicKey)}
                >
                  <FiCopy className="w-5 h-5" />
                  <span className="sr-only">Copy public key</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-muted-foreground">Private Key:</span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono break-all">
                  {isPrivateKeyVisible
                    ? wallet?.privateKey
                    : "••••••••••••••••"}
                </code>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPrivateKeyVisible(!isPrivateKeyVisible)}
                  >
                    {isPrivateKeyVisible ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                    <span className="sr-only">
                      Toggle private key visibility
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(wallet.privateKey)}
                  >
                    <FiCopy className="w-5 h-5" />
                    <span className="sr-only">Copy private key</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-start">
              <span className="text-muted-foreground mr-2">Balance:</span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mt-1 sm:mt-0">
                <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono break-all">
                  {wallet?.balance} SOL
                </code>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/transaction")}
            >
              View Transactions
            </Button>
            <Button
              onClick={() => {
                window.open("https://faucet.solana.com/");
              }}
            >
              Add Funds
            </Button>
          </div>

          {copyNotification && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              {copyNotification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
