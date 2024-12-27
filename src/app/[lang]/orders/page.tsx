"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Order, OrderProducts, Product } from "src/app/components/types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const router = useRouter();
  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("/api/orders", {
        method: "GET",
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
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
        <div>
          {orders.map((order, index) => {
            return (
              <OrderCard
                key={order.id}
                products={order.products}
                order_id={order.id}
              ></OrderCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface OrderCardProps {
  products: OrderProducts[];
  order_id: number;
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
      for (const product of productsToFetch) {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            product_id: JSON.stringify(product.product_id),
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData) {
            const isProductInArray = tempProducts.some(
              (item) => item.product.id === responseData.id
            );

            if (!isProductInArray) {
              tempProducts.push({
                product: responseData[0],
                quantity: product.quantity,
              });
            }
          }
        }
      }
      setProducts(tempProducts);

      setIsLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-wrapper bg-red-200 h-auto rounded-xl">
      <div className="w-full border-b border-gray-200 p-5">
        Order: # {props.order_id}
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

// {orders.map((order, index) => {
//   const formattedDate = new Date(
//     order[index].created_at
//   ).toLocaleDateString("en-CA");
//   return (
//     <div
//       key={order[index].id}
//       className="h-120 w-150 rounded-2xl border border-gray-800 bg-white flex flex-col"
//     >
//       <div className="flex flex-row w-full items-center justify-between border-b-2 p-5">
//         <div className="">
//           Order Id: #{order[index].stripe_purchase_id}
//         </div>
//         <div
//           className="underline flex cursor-pointer"
//           onClick={() => {
//             router.push(`/orders/${order[index].stripe_purchase_id}`);
//           }}
//         >
//           See Details
//         </div>
//       </div>
//       <div className="grid grid-cols-4 gap-4">
//         {order.map((order) => {
//           return (
//             <div key={order.id} className="p-5">
//               <div className="w-full h-40 rounded bg-gray-200 flex flex-col  items-center justify-center gap-2 border shadow-sm shadow-black">
//                 {/* <div>Name : {order.title}</div> */}
//                 <div>Price: {order.total_price / 100}$</div>
//                 <div>Date: {formattedDate}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// })}
