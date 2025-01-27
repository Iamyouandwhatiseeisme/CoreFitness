import { NextRequest, NextResponse } from "next/server";
import { SubscriptionInfo, SubscriptionStatus } from "src/app/components/types";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const email = request.headers.get("email");

  if (email) {
    try {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });
      const customerId = customers.data[0].id;

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      console.log(subscriptions);

      if (subscriptions.data.length > 0) {
        const subscriptionInfo: SubscriptionInfo = {
          status:
            subscriptions.data[0].status === "active"
              ? SubscriptionStatus.Active
              : SubscriptionStatus.Inactive,
          currentPeriodStart: subscriptions.data[0].current_period_start,
          currentPeriodEnd: subscriptions.data[0].current_period_end,
        };
        return NextResponse.json(subscriptionInfo, { status: 200 });
      } else {
        console.log("throw subscription error");
        const inactiveSubscription: SubscriptionInfo = {
          status: SubscriptionStatus.Inactive,
          currentPeriodStart: 0,
          currentPeriodEnd: 0,
        };

        return NextResponse.json({ inactiveSubscription }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
