"use client";
import { useEffect, useState } from "react";
import { Order, OrderProducts, Product } from "../types";
import React from "react";
import { useLocale } from "../providers/LanguageContext";

export interface OrderCardProps {
  products: OrderProducts[];
  order: Order;
}

export function OrderCard(props: OrderCardProps) {
  const [products, setProducts] = useState<
    Array<{ product: Product; quantity: number }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    dictionary: { order },
  } = useLocale();
  const productsToFetch = props.products;

  useEffect(() => {
    async function fetchOrders() {
      const tempProducts: Array<{ product: Product; quantity: number }> = [];

      const response = await fetch("/api/products/orderProducts", {
        method: "GET",
        headers: {
          product_id: JSON.stringify(
            productsToFetch.map((product) => product.product_id)
          ),
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const responseArray = [...responseData[0]];

        responseArray.forEach((item: Product, index: number) => {
          const isProductInArray = tempProducts.some(
            (itemToFetch) => itemToFetch.product.id === item.id
          );
          if (!isProductInArray) {
            tempProducts.push({
              product: item,
              quantity: productsToFetch[index].quantity,
            });
          }
        });
      }

      setProducts(tempProducts);

      setIsLoading(false);
    }
    fetchOrders();
  }, [productsToFetch]);

  return (
    <div className="bg-white m-auto  p-4 ml-10 mr-10 sm:ml-40 sm:mr-40 sm:pl-10 sm:pr-10  pt-10 dark:bg-gray-800 h-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="w-full border-b border-gray-200 dark:border-gray-700 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {order.Order}: #{props.order.id}
        </div>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {order.Total}: ${(props.order.total_price / 100).toFixed(2)}
        </div>
      </div>
      <div className="p-5 text-gray-700 dark:text-gray-300">
        <p>
          <strong>{order.CreatedAt}:</strong>{" "}
          {new Date(props.order.created_at).toLocaleString()}
        </p>

        <p>
          <strong>{order.Email}:</strong> {props.order.email}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="p-5 text-center text-gray-500 dark:text-gray-400">
          {order.Products} {order.NotFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {products.map((productItem, index) => {
            const { product, quantity } = productItem;
            return (
              <div
                key={index}
                className="border rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-700 dark:border-gray-600"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-40 h-40 object-cover mb-4 rounded-md hidden sm:flex"
                />
                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
                  {product.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {order.Price}: ${(product.price / 100).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.Quantity}: {quantity}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
