"use client";
import { redirect, useRouter } from "next/navigation";
// import type { Stripe } from "stripe";

import PrintObject from "../../../components/PrintObject/PrintObject";
// import { stripe } from "../../../../lib/stripe";
import { useEffect } from "react";

export default function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): JSX.Element {
  const router = useRouter();
  // if (!searchParams.session_id)
  // throw new Error("Please provide a valid session_id (`cs_test_...`)");

  // const checkoutSession: Stripe.Checkout.Session =
  //   await stripe.checkout.sessions.retrieve(searchParams.session_id, {
  //     expand: ["line_items", "payment_intent"],
  //   });
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);

  // const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  return (
    <div className="min-h-wrapper ">
      {/* <h2>Status: {paymentIntent.status}</h2> */}
      <h2 className="pt-52">
        Successfull Payement, you will be redirected to home page
      </h2>
      {/* <h3>Checkout Session response:</h3> */}
      {/* <PrintObject content={checkoutSession} /> */}
    </div>
  );
}
