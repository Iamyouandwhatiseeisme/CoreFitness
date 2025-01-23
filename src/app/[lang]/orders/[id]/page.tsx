"use client";
import React from "react";
import { Product } from "../../../components/types";
import { useEffect, useState } from "react";
interface OrderPageProps {
  params: {
    lang: string;
    id: string;
  };
}

export default function OrdersPage(props: OrderPageProps) {
  const [orderDetails, setOrderDetails] = useState<Product[]>([]); // Use an array for order details
  const { id } = props.params;

  useEffect(() => {
    async function fetchOrderDetails() {
      const response = await fetch("/api/orders/orderDetails", {
        method: "GET",
        headers: {
          order_id: id,
        },
      });
      if (response.ok) {
        const responseData: Product[] = await response.json();
        setOrderDetails(responseData);
      }
    }
    fetchOrderDetails();
  }, [id]);

  return (
    <div className="gap-4 flex pt-44 flex-col items-center justify-center min-h-wrapper">
      {orderDetails.length > 0 ? (
        orderDetails.map((product, index) => {
          const formattedDate = new Date(product.created_at).toLocaleDateString(
            "en-CA"
          );
          return (
            <div
              key={index}
              className="w-150 h-120 border rounded-2xl items-start flex flex-row justify-start border-gray-400"
            >
              <img
                className="w-96 h-96 rounded-2xl p-2"
                src={product.img_url}
                alt={product.title}
              />
              <div className="flex flex-col w-full p-2 m-5 gap-2">
                <div className="font-bold border-b w-full border-gray-400 ">
                  {product.title}
                </div>
                <div>Price: {product.price / 100}$</div>
                <div>Date of Order: {formattedDate}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No products found for this order.</div> // Display a message if no products are found
      )}
    </div>
  );
}
