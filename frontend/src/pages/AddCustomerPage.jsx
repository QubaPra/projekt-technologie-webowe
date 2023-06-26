import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";

export const AddCustomerPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        const createdCustomer = await response.json();
        console.log("New customer created:", createdCustomer);
        // Reset the form
        setCustomer({
          name: "",
          surname: "",
          email: "",
          phone_number: "",
        });
      } else {
        console.error("Failed to create customer:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating customer:", error);
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
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
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
                  value={customer.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-primary p-1 focus:border-primary block w-full shadow-md sm:text-sm border-2 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  value={customer.surname}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-primary p-1 focus:border-primary block w-full shadow-md sm:text-sm border-2 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-primary p-1 focus:border-primary block w-full shadow-md sm:text-sm border-2 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={customer.phone_number}
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
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
