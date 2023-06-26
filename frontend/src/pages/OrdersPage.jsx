import React, { useState, useEffect } from "react";
import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrderData, setEditedOrderData] = useState({ productName: "", quantity: "" });

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

  const deleteOrder = async (orderId) => {
    try {
      await fetch(`http://127.0.0.1:8000/orders/${orderId}`, {
        method: "DELETE",
      });
      fetchData(); // Fetch orders again after successful deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const startEditingOrder = (orderId, productName, quantity) => {
    setEditingOrderId(orderId);
    setEditedOrderData({ productName, quantity });
  };

  const cancelEditingOrder = () => {
    setEditingOrderId(null);
    setEditedOrderData({ productName: "", quantity: "" });
  };

  const saveEditedOrder = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/orders/${editingOrderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: editedOrderData.productName,
          quantity: editedOrderData.quantity,
        }),
      });
      if (response.ok) {
        fetchData(); // Fetch orders again after successful update
      } else {
        console.error("Error saving edited order:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving edited order:", error);
    } finally {
      setEditingOrderId(null);
      setEditedOrderData({ productName: "", quantity: "" });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                <th className="px-6 py-3 text-sm border-b">Order ID</th>
                <th className="px-6 py-3 text-sm border-b">Customer Full Name</th>
                <th className="px-6 py-3 text-sm border-b">Product Name</th>
                <th className="px-6 py-3 text-sm border-b">Quantity</th>
                <th className="px-6 py-3 text-sm border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-6 text-sm py-4 border-b">{order.id}</td>
                  <td className="px-6 text-sm py-4 border-b">{order.customer_fullname}</td>
                  <td className="px-6 text-sm py-4 border-b">
                    {editingOrderId === order.id ? (
                      <input
                        type="text"
                        name="productName"
                        value={editedOrderData.productName}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-16  "
                      />
                    ) : (
                      order.product_name
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm border-b">
                    {editingOrderId === order.id ? (
                      <input
                        type="text"
                        name="quantity"
                        value={editedOrderData.quantity}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-10"
                      />
                    ) : (
                      order.quantity
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm border-b">
                    {editingOrderId === order.id ? (
                      <>
                        <button className="p-1 text-sm" onClick={saveEditedOrder}>
                          Save
                        </button>
                        <button className="p-1 text-sm" onClick={cancelEditingOrder}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="p-1 text-sm"
                          onClick={() =>
                            startEditingOrder(order.id, order.product_name, order.quantity)
                          }
                        >
                          Edit
                        </button>
                        <button className="p-1 text-red-500" onClick={() => deleteOrder(order.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
