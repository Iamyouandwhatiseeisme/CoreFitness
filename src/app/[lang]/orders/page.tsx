"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Order } from "src/app/components/types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
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
            const formattedDate = new Date(
              order[index].created_at
            ).toLocaleDateString("en-CA");
            return (
              <div
                key={order[index].id}
                className="h-120 w-150 rounded-2xl border border-gray-800 bg-white flex flex-col"
              >
                <div className="flex flex-row w-full items-center justify-between border-b-2 p-5">
                  <div className="">
                    Order Id: #{order[index].stripe_purchase_id}
                  </div>
                  <div className="underline flex">See Details</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {order.map((order) => {
                    return (
                      <div key={order.id} className="p-5">
                        <div className="w-full h-40 rounded bg-gray-200 flex flex-col  items-center justify-center gap-2 border shadow-sm shadow-black">
                          <div>Name : {order.title}</div>
                          <div>Price: {order.price / 100}$</div>
                          <div>Date: {formattedDate}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// orders.map((orderGroup, index) => {
//   const formattedDate = new Date(order.created_at).toLocaleDateString(
//     "en-CA"
//   );
//   return (
//     <div
//       key={order.created_at}
//       className=" relative border-gray-400 h-28  rounded-2xl border  w-150 p-5 m-10 flex flex-col items-center"
//     >
//       <div className="w-full  border-b-2 border-gray-300 flex flex-row justify-between gap-2">
//         <div className="flex flex-row gap-2">
//           <div className="">{order.title}</div>
//           <div>Price: {order.price / 100}$</div>
//         </div>

//         <div
//           className="underline cursor-pointer"
//           onClick={() => {
//             router.push(`/orders/${order.id}`);
//           }}
//         >
//           See details
//         </div>
//       </div>

//       <div className="absolute bottom-0 p-3 items-end justify-between flex flex-row  w-full">
//         <div className="flex flex-row  p-2">Order ID: #{order.id}</div>
//         <div className="flex flex-row  p-2">
//           Order Time: {formattedDate}
//         </div>
//       </div>
//     </div>
//   );
// })
// )}
