"use client";
import Link from "next/link";
import React from "react";
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
    <div className="w-full  min-h-wrapper bg-gradient-to-tl from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="pt-10">You haven&apos;t made any orders yet</div>
      ) : (
        <div className="">
          {orders.map((order) => {
            return (
              <Link
                key={order.id}
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
