import React, { useState, useEffect } from "react";
import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductPrice, setEditedProductPrice] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/products/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://127.0.0.1:8000/products/${productId}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEditingProduct = (productId, price) => {
    setEditingProductId(productId);
    setEditedProductPrice(price);
  };

  const cancelEditingProduct = () => {
    setEditingProductId(null);
    setEditedProductPrice("");
  };

  const saveEditedProduct = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${editingProductId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: editedProductPrice,
          }),
        }
      );
      if (response.ok) {
        fetchData();
      } else {
        console.error("Error saving edited product:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving edited product:", error);
    } finally {
      setEditingProductId(null);
      setEditedProductPrice("");
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setEditedProductPrice(value);
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
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm border-b">Product ID</th>
                <th className="px-6 py-3 text-sm border-b">Name</th>
                <th className="px-6 py-3 text-sm border-b">Price</th>
                <th className="px-6 py-3 text-sm border-b">Description</th>
                <th className="px-6 py-3 text-sm border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm border-b">{product.id}</td>
                  <td className="px-6 py-4 text-sm border-b">{product.name}</td>
                  <td className="px-6 py-4 text-sm border-b">
                  ${editingProductId === product.id ? (
                      <input
                        type="text"
                        name="price"
                        value={editedProductPrice}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-14"
                      />
                    ) : (
                      `${product.price}`
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm border-b">{product.description}</td>
                  <td className="px-6 py-4 text-sm border-b">
                    {editingProductId === product.id ? (
                      <>
                        <button className="p-2 text-sm"  onClick={saveEditedProduct}>
                          Save
                        </button>
                        <button className="p-2 text-sm" onClick={cancelEditingProduct}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="p-2 text-sm"
                          onClick={() =>
                            startEditingProduct(product.id, product.price)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="p-2 text-sm text-red-500"
                          onClick={() => deleteProduct(product.id)}
                        >
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
