/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/newButton";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Define types for the component's state and data structure
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

interface Filters {
  status: string[];
  date: {
    from: string | null;
    to: string | null;
  };
  product: string;
}

export default function Component() {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    status: [],
    date: {
      from: null,
      to: null,
    },
    product: "",
  });

  const orders: Order[] = [
    {
      id: "ORD001",
      date: "2023-05-12",
      items: [
        {
          name: "Wireless Headphones",
          quantity: 1,
          price: 49.99,
        },
        {
          name: "Laptop Backpack",
          quantity: 1,
          price: 29.99,
        },
      ],
      total: 79.98,
      status: "Delivered",
    },
    {
      id: "ORD002",
      date: "2023-04-28",
      items: [
        {
          name: "Fitness Tracker",
          quantity: 1,
          price: 59.99,
        },
      ],
      total: 59.99,
      status: "Shipped",
    },
    {
      id: "ORD003",
      date: "2023-03-15",
      items: [
        {
          name: "Gaming Mouse",
          quantity: 1,
          price: 39.99,
        },
        {
          name: "Mechanical Keyboard",
          quantity: 1,
          price: 79.99,
        },
      ],
      total: 119.98,
      status: "Cancelled",
    },
    {
      id: "ORD004",
      date: "2023-02-22",
      items: [
        {
          name: "Smartwatch",
          quantity: 1,
          price: 99.99,
        },
      ],
      total: 99.99,
      status: "Delivered",
    },
    {
      id: "ORD005",
      date: "2023-01-10",
      items: [
        {
          name: "DSLR Camera",
          quantity: 1,
          price: 499.99,
        },
      ],
      total: 499.99,
      status: "Shipped",
    },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filters.status.length > 0 && !filters.status.includes(order.status)) {
        return false;
      }
      if (
        filters.date.from &&
        new Date(order.date) < new Date(filters.date.from)
      ) {
        return false;
      }
      if (filters.date.to && new Date(order.date) > new Date(filters.date.to)) {
        return false;
      }
      if (
        filters.product &&
        !order.items.some((item) =>
          item.name.toLowerCase().includes(filters.product.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });
  }, [filters, orders]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (type: keyof Filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <div className="w-5 h-5" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Order Status</h3>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.status.includes("Delivered")}
                          onCheckedChange={() =>
                            handleFilterChange(
                              "status",
                              filters.status.includes("Delivered")
                                ? filters.status.filter(
                                    (s) => s !== "Delivered"
                                  )
                                : [...filters.status, "Delivered"]
                            )
                          }
                        />
                        Delivered
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.status.includes("Shipped")}
                          onCheckedChange={() =>
                            handleFilterChange(
                              "status",
                              filters.status.includes("Shipped")
                                ? filters.status.filter((s) => s !== "Shipped")
                                : [...filters.status, "Shipped"]
                            )
                          }
                        />
                        Shipped
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.status.includes("Cancelled")}
                          onCheckedChange={() =>
                            handleFilterChange(
                              "status",
                              filters.status.includes("Cancelled")
                                ? filters.status.filter(
                                    (s) => s !== "Cancelled"
                                  )
                                : [...filters.status, "Cancelled"]
                            )
                          }
                        />
                        Cancelled
                      </Label>
                    </div>
                  </div>
                  <div></div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Export</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Order #</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Track</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-medium">
                    <Link
                      href="/"
                      className="text-primary hover:underline"
                      prefetch={false}
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity} x {item.name}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Shipped"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href="/"
                      className="text-primary hover:underline"
                      prefetch={false}
                    >
                      Track
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
