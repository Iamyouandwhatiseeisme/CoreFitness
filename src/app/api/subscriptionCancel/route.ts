import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const email = request.headers.get("email");
  console.log("cancel");
  if (email) {
    try {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });
      const customerId = customers.data[0].id;
      console.log(customerId);

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      console.log(subscriptions);
      if (subscriptions.data.length > 0) {
        const subscription = await stripe.subscriptions.cancel(
          subscriptions.data[0].id
        );
        console.log(subscription);
        if (subscription.status === "canceled") {
          return NextResponse.json(subscription, { status: 200 });
        }
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
