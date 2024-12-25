"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Order, Product } from "src/app/components/types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
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
              className=" relative border-gray-400 h-28  rounded-2xl border  w-150 p-5 m-10 flex flex-col items-center"
            >
              <div className="w-full  border-b-2 border-gray-300 flex flex-row justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="">{order.title}</div>
                  <div>Price: {order.price / 100}$</div>
                </div>

                <div
                  className="underline cursor-pointer"
                  onClick={() => {
                    router.push(`/orders/${order.id}`);
                  }}
                >
                  See details
                </div>
              </div>

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
