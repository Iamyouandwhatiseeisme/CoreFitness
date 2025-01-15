"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderCard } from "src/app/components/OrderCard/OrderCard";
import { Order } from "src/app/components/types";

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
    <div className="w-full  min-h-wrapper pt-32 flex flex-col items-center justify-center ">
      {isLoading ? (
        <div>Orders are loading</div>
      ) : orders.length === 0 ? (
        <div className="pt-10">You haven't made any orders yet</div>
      ) : (
        <div className="">
          {orders.map((order, index) => {
            return (
              <Link
                className="p-5"
                data-cy={order.id}
                href={`/orders/${order.id}`}
              >
                <OrderCard
                  key={order.id}
                  products={order.products}
                  order={order}
                ></OrderCard>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
