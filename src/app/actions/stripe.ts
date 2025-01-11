"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { CURRENCY } from "../../config";
import { formatAmountForStripe } from "../utils/stripe/stripe-helpers";
import { stripe } from "../../lib/stripe";
import { Plan } from "../components/types";
import { CartItem } from "../components/providers/CartProvider";

export async function createCheckoutSessionForCart(cartItems: CartItem[]) {
  // try {
  console.log("trying to fetch");

  // const session: Stripe.Checkout.Session =
  //   await stripe.checkout.sessions.create({
  //     success_url:
  //       "http://localhost:3000/orders/result?session_id={CHECKOUT_SESSION_ID}",
  //     line_items: cartItems.map((item) => {
  //       return {
  //         quantity: item.quantity,
  //         price: item.product.stripe_price_id,
  //       };
  //     }),
  //     mode: "payment",
  // metadata: {
  //   cart_items: JSON.stringify(
  //     cartItems.map((item) => ({
  //       title: item.product.title,
  //       product_id: item.product.id,
  //       quantity: item.quantity,
  //     }))
  //       ),
  //     },
  //   });

  // return {
  //   client_secret: session.client_secret,
  //   url: session.url,
  // };
}

export async function createCheckoutSessionForSubscription(
  data: FormData,
  plan: Plan
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    "uiMode"
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      submit_type: "subscribe",
      line_items: [
        {
          quantity: 1,
          price: plan.priceId,
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/pricing/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/pricing/result?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(100, CURRENCY),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
