import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";

export const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const createdProduct = await response.json();
        console.log("New product created:", createdProduct);
        // Reset the form
        setProduct({
          name: "",
          price: 0,
          description: "",
        });
      } else {
        console.error("Failed to create product:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add product</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-primary p-1 focus:border-primary block w-full shadow-md sm:text-sm border-2 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-primary p-1 focus:border-primary block w-full shadow-md sm:text-sm border-2 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={product.description}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-primary p-1 focus:border-primary block w-full shadow-md sm:text-sm border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex pt-6 justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
