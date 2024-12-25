"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "src/app/components/types";
interface Order extends Omit<Product, "img_url"> {
  stripe_purchase_id: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("/api/orders", {
        method: "GET",
      });
      if (response.ok) {
        const responseData = await response.json();
        setOrders(responseData);
      }
      setIsLoading(false);
    }
    fetchOrders();
  }, []);
  return (
    <div className="w-full  min-h-wrapper pt-32 ">
      {isLoading ? (
        <div>Orders are loading</div>
      ) : orders.length === 0 ? (
        <div className="pt-10">You haven't made any orders yet</div>
      ) : (
        orders.map((order) => {
          const formattedDate = new Date(order.created_at).toLocaleDateString(
            "en-CA"
          );
          return (
            <div
              key={order.created_at}
              className=" relative border-gray-400 h-40 rounded-2xl border  w-150 p-5 m-10 flex flex-col items-center"
            >
              <div className=" border-b-2 border-gray-300 w-full items">
                {order.title}
              </div>
              <div className="w-full ">Price: {order.price / 100}$</div>
              <div className="absolute bottom-0 p-3 items-end justify-between flex flex-row  w-full">
                <div className="flex flex-row  p-2">Order ID: #{order.id}</div>
                <div className="flex flex-row  p-2">
                  Order Time: {formattedDate}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
