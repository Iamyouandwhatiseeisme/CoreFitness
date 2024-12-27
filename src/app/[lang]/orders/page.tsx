"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderCard } from "src/app/components/OrderCard/OrderCard";
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
        <div className="">
          {orders.map((order, index) => {
            return (
              <div className="p-5">
                <OrderCard
                  key={order.id}
                  products={order.products}
                  order={order}
                ></OrderCard>
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
