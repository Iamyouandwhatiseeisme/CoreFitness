import { redirect } from "next/navigation";
import { OrderProducts } from "src/app/components/types";
import { createClient } from "src/app/utils/supabase/server";
import { stripe } from "src/lib/stripe";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (searchParams.session_id) {
    const session = await stripe.checkout.sessions.retrieve(
      searchParams.session_id
    );
    if (session.status === "complete") {
      if (session.metadata) {
        const cartItems = JSON.parse(session.metadata.cart_items);
        const { data: lineItems } =
          await stripe.checkout.sessions.listLineItems(searchParams.session_id);
        if (lineItems) {
          const orders: OrderProducts[] = lineItems.map((item, index) => ({
            product_id: cartItems[index].product_id as number,
            quantity: item.quantity as number,
          }));
          if (orders) {
            const { data, error } = await supabase.from("orders").insert({
              user_id: user?.id,
              total_price: session.amount_total,
              stripe_purchase_id: session.payment_intent,
              products: orders,
            });
            if (data) {
              redirect("/orders");
            }
          }
        }
      }
    }
  }

  return (
    <div className="min-h-wrapper ">
      <h2 className="pt-52">
        Successfull Payement, you will be redirected to home page
      </h2>
    </div>
  );
}
