export async function isStripeSubscriptionActive() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  const response = await fetch("https://api.stripe.com/v1/subscriptions", {
    headers: {
      Authorization: `Bearer ${apiKey} `,
      customer: "cus_RNy5j2SSxnHKPg",
    },
  });

  const responseData = await response.json();

  console.log(responseData);
}
