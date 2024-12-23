"use client";

import type Stripe from "stripe";

import React, { useState } from "react";
import { createCheckoutSessionForSubscription } from "../../actions/stripe";
import { Plan } from "../types";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
  plan: Plan;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);

  const formAction = async (data: FormData): Promise<void> => {
    const { url } = await createCheckoutSessionForSubscription(
      data,
      props.plan
    );

    window.location.assign(url as string);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />

        <button
          className="checkout-style-background"
          type="submit"
          disabled={loading}
        >
          {props.plan.reccurence} Subscription{" "}
        </button>
      </form>
    </>
  );
}
