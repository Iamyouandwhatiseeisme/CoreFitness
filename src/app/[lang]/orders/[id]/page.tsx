"use client";
import React from "react";
import { Order, Product } from "../../../components/types";
import { useEffect, useState } from "react";
import { useLocale } from "src/app/components/providers/LanguageContext";

interface OrderPageProps {
  params: {
    lang: string;
    id: string;
  };
}

export default function OrdersPage(props: OrderPageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    dictionary: { order: orderDict },
  } = useLocale();
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
        setProducts(responseData);
      }
      const responseOrder = await fetch("/api/orders/singleOrder", {
        method: "GET",
        headers: {
          id: id,
        },
      });
      if (responseOrder.ok) {
        const responseData: Order = (await responseOrder.json()) as Order;
        setOrder(responseData);
      }
      setIsLoading(false);
    }
    fetchOrderDetails();
  }, [id]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-wrapper bg-gray-50 h-full w-full mt-20 sm:mt-0 dark:bg-gray-900 p-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : order ? (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {orderDict.Order} #{order.id}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-gray-500 dark:text-gray-400">
                  {orderDict.OrderDate}
                </p>
                <p className="font-medium dark:text-gray-200">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 dark:text-gray-400">
                  {orderDict.TotalAmount}
                </p>
                <p className="font-medium dark:text-gray-200">
                  ${(order.total_price / 100).toFixed(2)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 dark:text-gray-400">
                  {orderDict.CustomerEmail}
                </p>
                <p className="font-medium dark:text-gray-200">{order.email}</p>
              </div>
              <div className="space-y-1"></div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {orderDict.Products} ({products.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const title =
                props.params.lang === "ka" ? product.title_ka : product.title;
              const description =
                props.params.lang === "ka"
                  ? product.description_ka
                  : product.description;
              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    {product.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`${product.title} -  ${idx + 1}`}
                        className={`object-cover ${idx === 0 ? "" : "hidden"}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold dark:text-white">
                      {title}
                    </h3>

                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ${(product.price / 100).toFixed(2)}
                    </p>

                    <div className="border-t pt-2 mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {orderDict.Category}:
                        </span>
                        <span className="ml-1 dark:text-gray-200">
                          {product.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {orderDict.Quantity}:
                        </span>
                        <span className="ml-1 font-mono dark:text-gray-200">
                          {order.products.map((orderProduct) => {
                            return orderProduct.product_id === product.id
                              ? orderProduct.quantity
                              : "";
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {orderDict.CreatedAt}:
                        </span>
                        <span className="ml-1 dark:text-gray-200">
                          {formatDate(product.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 text-xl mt-8">
          {orderDict.OrderNotFound}
        </div>
      )}
    </div>
  );
}
