import React, { useState, useEffect } from "react";
import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/orders/");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">Order ID</th>
                <th className="px-6 py-3 border-b">Customer Full Name</th>
                <th className="px-6 py-3 border-b">Product Name</th>
                <th className="px-6 py-3 border-b">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{order.id}</td>
                  <td className="px-6 py-4 border-b">{order.customer_fullname}</td>
                  <td className="px-6 py-4 border-b">{order.product_name}</td>
                  <td className="px-6 py-4 border-b">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
