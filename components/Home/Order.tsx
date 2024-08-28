/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "../Appbar/Appbar";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";


interface OrderItem {
  quantity: number;
  productTitle: string;
  productDescription: string;
  productImage: string;
  productCategory: string;
  productPrice: string;
}

interface Order {
  id: string;
  userId: string;
  totalPrice: string; 
  orderStatus: Status; 
  createdAt: string;
  updatedAt: string;
  quantity: OrderItem[]; 
}

enum Status {
  Pending = "Pending",
  Delivered = "Delievered",
  Refunded = "Refunded",
  Cancelled = "Cancelled",
}

interface GetAllOrdersResponse {
  success: boolean;
  orders: Order[];
}

interface FilterOrdersResponse {
  success: boolean;
  orders: Order[];
}

interface SuccessResponse {
  success: boolean;
  orders?: Order[]; 
}

interface ErrorResponse {
  success: false;
  message: string;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Record<string, string>>({}); //  an object to store messages for each order

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get<GetAllOrdersResponse>("/api/order/get-allbyuser");
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleFilterChange = async (status: Status | "") => {
    setLoading(true);
    setFilterStatus(status);

    try {
      const response = status === ""
        ? await axios.get<GetAllOrdersResponse>("/api/order/get-allbyuser")
        : await axios.post<FilterOrdersResponse>("/api/order/filter", { orderstatus: status });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsReceived = async (orderId: string) => {
    try {
      const response = await axios.put<SuccessResponse>("/api/order/updateStatus", { orderId, message: messages[orderId] });

      if (response.data.success) {
        setMessages(prev => ({ ...prev, [orderId]: "" })); // Clear message for the specific order
        await fetchAllOrders();
        toast.success("Received successfully!");
      } else {
        setMessages(prev => ({ ...prev, [orderId]: "Failed to update order status." }));
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setMessages(prev => ({ ...prev, [orderId]: "Error updating order status." }));
      toast.error("Error updating order status.");
    }
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">An error occurred: {error.message}</div>;
  }

  const filteredOrders = orders.filter(order =>
    filterStatus === "" || order.orderStatus === filterStatus
  );

  return (
    <>
    <Toaster/>
    <div className="container mx-auto p-6 max-w-6xl">
      <Appbar />
      <h1 className="text-4xl font-bold mb-6 text-center mt-4">My Orders</h1>

      {/* Filter Buttons for large screens */}
      <div className="hidden sm:flex mb-6 justify-center space-x-4">
        {Object.values(Status).map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-500 hover:text-white`}
          >
            {status === "Delievered" ? "Delivered" : status}
          </button>
        ))}
        <button
          onClick={() => handleFilterChange("")}
          className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
            filterStatus === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-blue-500 hover:text-white`}
        >
          All
        </button>
      </div>

      <div className="flex justify-center mb-6 sm:hidden">
        <button
          onClick={() => setFilterMenuOpen(!filterMenuOpen)}
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Filter
        </button>
      </div>

      {filterMenuOpen && (
        <div className="sm:hidden mb-6 bg-white border rounded-lg shadow-lg p-4">
          <nav className="flex flex-col gap-2">
            {Object.values(Status).map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-500 hover:text-white`}
              >
                {status}
              </button>
            ))}
            <button
              onClick={() => handleFilterChange("")}
              className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                filterStatus === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              } hover:bg-blue-500 hover:text-white`}
            >
              All
            </button>
          </nav>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-lg font-semibold">No orders found</div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3">Order ID: {order.id}</h2>
              <p className="mb-2 text-lg">
                Total Price: <span className="font-bold">{order.totalPrice} SOL</span>
              </p>
              <p className="mb-2 text-lg">
                Status:{" "}
                <span
                  className={`font-bold ${
                    order.orderStatus === Status.Delivered
                      ? "text-green-600"
                      : order.orderStatus === Status.Pending
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {order.quantity.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.productImage}
                      alt={item.productTitle}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.productTitle}</h3>
                      <p className="text-gray-600">{item.productDescription}</p>
                      <p className="font-bold">{item.productPrice} SOL</p>
                    </div>
                  </div>
                ))}
              </div>

              {order.orderStatus === Status.Pending && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter message here"
                    value={messages[order.id] || ""}
                    onChange={(e) =>
                      setMessages(prev => ({
                        ...prev,
                        [order.id]: e.target.value
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />

<p className="pt-2">Enter received after receiving your order</p>

                  <button
                    onClick={() =>  handleMarkAsReceived(order.id)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Mark as Received
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Order;
