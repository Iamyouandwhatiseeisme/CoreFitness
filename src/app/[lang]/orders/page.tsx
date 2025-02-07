"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { PiShoppingBagOpen } from "react-icons/pi";
import { OrderCard } from "src/app/components/OrderCard/OrderCard";
import { useLocale } from "src/app/components/providers/LanguageContext";
import { Order } from "src/app/components/types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    dictionary: { order },
    locale,
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
        <div className="flex  flex-col justify-center mt-40 items-center h-full gap-20 ">
          <div className=" text-center text-gray-700 dark:text-gray-300 text-lg">
            {order.YouHaventYet}
          </div>
          <Link
            href="/products"
            className="flex items-center justify-center mt-4 px-4 py-2 bg-blue-500/40 text-white rounded-md hover:bg-blue-600/80 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {locale === "ka" ? " იშოპინგე ახლავე!" : " Shop Now"}
            <PiShoppingBagOpen size={24} className="ml-2"></PiShoppingBagOpen>
          </Link>
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
