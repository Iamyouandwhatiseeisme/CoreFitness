"use client";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";
import { Product } from "../../../components/types";
import { useEffect, useState } from "react";

export default function OrdersPage(
  params: Record<string, Record<string, string>>
) {
  const [orderDetails, setOrderDetails] = useState<Product>();
  const { id } = params.params;

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
        setOrderDetails(responseData[0]);
      }
    }
    fetchOrderDetails();
  }, []);

  // if (!orderDetails) return <NotFound page="products" />;
  return (
    <div className="gap-4 flex pt-44 flex-col items-center justify-center min-h-wrapper ">
      {orderDetails ? (
        <div className=" w-150 h-120 border rounded-2xl items-start flex flex-row justify-start border-gray-400 ">
          <img
            className="w-96 h-96 rounded-2xl p-2"
            src={orderDetails.img_url}
          ></img>
        </div>
      ) : (
        <div></div>
      )}
      {/* <h1 className="underline cursor-pointer font-serif font-bold text-2xl">
        {product.title}
      </h1>
      <img
        className="w-80 h-80 "
        src={product.thumbnail}
        alt="product-image"
      ></img>
      <p className="text-5xl p-7">
        Tags:{" "}
        {product.tags.map((tag, index) => (
          <span
            className="bg-gray-400 rounded-xl p-2 dark:bg-gray-200  mr-2"
            key={index}
          >
            #{tag}
          </span>
        ))}{" "}
      </p>
      <div>
        <span className="border border-solid border-gray-500 rounded-lg p-2">
          Price: {product.price}$
        </span>{" "}
      </div>
      <ReturnBackButton destination={"products"} /> */}
    </div>
  );
}
