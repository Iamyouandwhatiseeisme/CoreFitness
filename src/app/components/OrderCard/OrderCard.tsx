import { useEffect, useState } from "react";
import { Order, OrderProducts, Product } from "../types";

export interface OrderCardProps {
  products: OrderProducts[];
  order: Order;
}

export function OrderCard(props: OrderCardProps) {
  const [products, setProducts] = useState<
    Array<{ product: Product; quantity: number }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const productsToFetch = props.products;

  useEffect(() => {
    async function fetchOrders() {
      let tempProducts: Array<{ product: Product; quantity: number }> = [];
      const response = await fetch("/api/products", {
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
    <div className=" bg-white h-auto rounded-xl border border-gray-300">
      <div className="w-full border-b border-gray-200 p-5 flex flex-row justify-between">
        <div> Order: # {props.order.id}</div>
        <div> Total: {props.order.total_price / 100}$</div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <div>No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((productItem, index) => {
            const { product, quantity } = productItem;
            return (
              <div
                key={index}
                className="border rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={product.img_url}
                  alt={product.title}
                  className="w-40 h-40 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-lg text-gray-600">${product.price / 100}</p>
                <p className="text-sm text-gray-500">Quantity: {quantity}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
