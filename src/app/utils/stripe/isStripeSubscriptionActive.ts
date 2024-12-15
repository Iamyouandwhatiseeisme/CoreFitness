import Stripe from "stripe";
export enum SubscriptionStatus {
  Active = "active",
  Inactive = "inactive",
}
export async function isStripeSubscriptionActive(email: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return SubscriptionStatus.Inactive;
    }

    const customerId = customers.data[0].id;

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    return subscriptions.data.length > 0
      ? SubscriptionStatus.Active
      : SubscriptionStatus.Inactive;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return SubscriptionStatus.Inactive;
  }
}
