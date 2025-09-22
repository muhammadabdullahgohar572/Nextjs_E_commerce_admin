"use client";

import { useEffect, useState } from "react";
import {
  FaSpinner,
  FaCheck,
  FaTruck,
  FaBox,
  FaTimes,
  FaEdit,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Status options
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
  ];

  // ✅ Call API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order", { cache: "no-store" });
      const data = await res.json();
      setOrders(data.data || []);
    } catch (error) {
      toast.error("⚠️ Failed to fetch orders!", {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Order Status
  const updateOrderStatus = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      const res = await fetch(`/api/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );

      toast.success("✅ Order status updated successfully!", {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("❌ Failed to update order status. Please try again.", {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <FaSpinner className="animate-spin text-4xl text-yellow-500 mb-4" />
        <p className="text-xl font-semibold">Loading Orders...</p>
        <p className="text-gray-400 mt-2">
          Please wait while we fetch your orders
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400 flex items-center gap-2">
          📦 Order Management
        </h1>

        {orders.length === 0 ? (
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-xl text-gray-300">No orders found</p>
            <p className="text-gray-500 mt-2">
              When customers place orders, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo =
                statusOptions.find((s) => s.value === order.status) ||
                statusOptions[0];

              return (
                <div
                  key={order._id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-yellow-500/10 transition-all"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-gray-700">
                    <div>
                      <p className="text-yellow-400 font-semibold text-sm">
                        Order ID: {order._id}
                      </p>
                      <p className="text-sm text-gray-400">
                        Date: {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>

                      {/* Status Dropdown */}
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                          disabled={updatingStatus === order._id}
                          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 pr-8"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {updatingStatus === order._id && (
                          <FaSpinner className="animate-spin absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                    <div>
                      <p className="text-gray-400 text-sm">Customer</p>
                      <p className="font-medium">{order.username}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="font-medium">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="font-medium">{order.PhoneNumber}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-400">
                      Items
                    </h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-400">
                              Color: {item.color} | Size: {item.size}
                            </p>
                            <p className="text-sm">
                              Qty: {item.quantity} × Rs.{item.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              Rs.{item.quantity * item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <p className="text-gray-400 text-sm">Payment Method</p>
                      <p className="font-medium">Credit Card</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Total Amount</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        Rs.{order.total}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Order;
