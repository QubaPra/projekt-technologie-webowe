import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/Avatar';

export function RecentSales() {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function fetchRecentOrders() {
      try {
        const response = await fetch('http://127.0.0.1:8000/orders');
        const orders = await response.json();
        const lastFiveOrders = orders.slice(-5); // Assuming the response is an array of orders

        const productsResponse = await fetch('http://127.0.0.1:8000/products');
        const products = await productsResponse.json();

        const updatedOrders = lastFiveOrders.map((order) => {
          const product = products.find((p) => p.name === order.product_name);
          const totalCost = product ? product.price * order.quantity : 0;

          return {
            ...order,
            totalCost,
          };
        });

        setRecentOrders(updatedOrders);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    }

    fetchRecentOrders();
  }, []);

  function getInitials(fullname) {
    const names = fullname.split(' ');
    const initials = names.map((name) => name[0].toUpperCase());
    return initials.join('');
  }

  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div className="flex items-center" key={order.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={order.avatar} alt="Avatar" />
            <AvatarFallback>{getInitials(order.customer_fullname)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer_fullname}</p>
            <p className="text-sm text-muted-foreground">{order.quantity}x {order.product_name}</p>
          </div>
          <div className="ml-auto font-medium">{`+$${order.totalCost.toFixed(2)}`}</div>
        </div>
      ))}
    </div>
  );
}
