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

      if (subscriptions.data.length > 0) {
        if (subscriptions.data[0].items.data[0].plan.product) {
          const plan = await stripe.products.retrieve(
            subscriptions.data[0].items.data[0].plan.product.toString()
          );
          if (plan) {
            const subscriptionInfo: SubscriptionInfo = {
              status:
                subscriptions.data[0].status === "active"
                  ? SubscriptionStatus.Active
                  : SubscriptionStatus.Inactive,
              currentPeriodStart: subscriptions.data[0].current_period_start,
              currentPeriodEnd: subscriptions.data[0].current_period_end,
              name: plan.name,
            };
            return NextResponse.json(subscriptionInfo, { status: 200 });
          } else {
            const inactiveSubscription: SubscriptionInfo = {
              status: SubscriptionStatus.Inactive,
              currentPeriodStart: 0,
              currentPeriodEnd: 0,
              name: "",
            };

            return NextResponse.json({ inactiveSubscription }, { status: 200 });
          }
        }
      } else {
        const inactiveSubscription: SubscriptionInfo = {
          status: SubscriptionStatus.Inactive,
          currentPeriodStart: 0,
          currentPeriodEnd: 0,
          name: "",
        };
        return NextResponse.json(
          {
            status: SubscriptionStatus.Inactive,
            currentPeriodStart: 0,
            currentPeriodEnd: 0,
            name: "",
          },
          { status: 400 }
        );
      }
      return NextResponse.json({}, { status: 400 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }
}
