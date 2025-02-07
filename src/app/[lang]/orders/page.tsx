"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { OrderCard } from "src/app/components/OrderCard/OrderCard";
import { useLocale } from "src/app/components/providers/LanguageContext";
import { Order } from "src/app/components/types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    dictionary: { order },
  } = useLocale();
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
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <div className="pt-10 text-center text-gray-700 dark:text-gray-300 text-lg">
            {order.YouHaventYet}
          </div>
        </div>
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
