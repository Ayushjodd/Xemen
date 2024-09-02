"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/newButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Appbar from "@/components/Appbar/Appbar";
import { Footer } from "@/components/Home/FooterNew";
import toast from "react-hot-toast";

interface Transaction {
  date: string;
  amount: string;
  status: "Confirmed" | "Failed";
  details: string;
}

interface AlchemyTransactionResponse {
  jsonrpc: string;
  result?: AlchemyTransaction[];
  id: number;
}

interface AlchemyTransaction {
  blockTime: number;
  err: any;
  signature: string;
}

interface TransactionDetailsResponse {
  result: {
    meta: {
      preBalances: number[];
      postBalances: number[];
    };
  };
}

export default function TransactionComponent() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const pageSize = 10; // Number of transactions to fetch per page

  const fetchTransactionAmount = async (signature: string) => {
    try {
      const response = await axios.post<TransactionDetailsResponse>(
        `https://solana-devnet.g.alchemy.com/v2/${apiKey}`,
        {
          jsonrpc: "2.0",
          id: 1,
          method: "getTransaction",
          params: [signature],
        }
      );
      const { result } = response.data;

      if (result) {
        const preBalance = result.meta.preBalances[0];
        const postBalance = result.meta.postBalances[0];
        const amountInLamports = postBalance - preBalance;

        const amountInSol = (Math.abs(amountInLamports) / 1e9).toFixed(2);

        return `${amountInSol} SOL`;
      }
    } catch (err) {
      console.error("Failed to fetch transaction amount:", err);
      return "0 SOL";
    }
    return "0 SOL";
  };


  async function fetchUserPublicKey(): Promise<void> {
    try {
      const response = await fetch("/api/wallet/view");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "An error occurred while fetching user public key."
        );
      }

      const data: { status: boolean; publicKey: string } =
        await response.json();

      if (!data.status) {
        throw new Error("Failed to fetch user public key.");
      }
      const { publicKey } = data;
      setWalletAddress(publicKey);
    } catch (error) {
      console.error("Error fetching user public key:", error);
      toast.error("Failed to fetch wallet address.");
    }
  }

  useEffect(() => {
    fetchUserPublicKey();
  }, []);

  const fetchTransactions = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      if (!apiKey) {
        throw new Error("API Key is missing");
      }

      const response = await axios.post<AlchemyTransactionResponse>(
        `https://solana-devnet.g.alchemy.com/v2/${apiKey}`,
        {
          jsonrpc: "2.0",
          id: 1,
          method: "getSignaturesForAddress",
          params: [walletAddress, { limit: pageSize, before: page > 0 ? transactions[transactions.length - 1].details : undefined }],
        }
      );

      const newTransactions = await Promise.all(
        (response.data.result || []).map(async (txn) => {
          const amount = await fetchTransactionAmount(txn.signature);
          const status: "Confirmed" | "Failed" = txn.err ? "Failed" : "Confirmed";

          return {
            date: new Date(txn.blockTime * 1000).toLocaleDateString(),
            amount: amount,
            status: status,
            details: txn.signature,
          };
        })
      );

      if (newTransactions.length < pageSize) {
        setHasMore(false);
      }

      setTransactions((prevTransactions) => [...prevTransactions, ...newTransactions]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError("Failed to fetch transactions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-32 mt-8">
        <Appbar />
      </div>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
          <div className="mb-6">
            <Label htmlFor="wallet-address">Enter Wallet Address</Label>
            <div className="flex items-center gap-2">
              <Input
                id="wallet-address"
                placeholder="Enter Wallet Address"
                className="flex-1"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <Button
                onClick={() => {
                  setTransactions([]);
                  setPage(0);
                  setHasMore(true);
                  fetchTransactions(0);
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Search"}
              </Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn, index) => (
                  <TableRow key={index}>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          txn.status === "Failed" ? "destructive" : "secondary"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`https://explorer.solana.com/tx/${txn.details}?cluster=devnet`}
                        className="text-blue-600 underline"
                        prefetch={false}
                        target="_blank"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {hasMore && (
            <div className="text-center mt-4">
              <Button
                onClick={() => fetchTransactions(page)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
