"use client";

import type Stripe from "stripe";

import React, { useState } from "react";
import { createCheckoutSessionForSubscription } from "../../actions/stripe";
import { Plan } from "../types";
import { useLocale } from "../providers/LanguageContext";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
  plan: Plan;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);
  const {
    dictionary: { subscription },
  } = useLocale();

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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          type="submit"
          disabled={loading}
        >
          {subscription.Subscription}{" "}
        </button>
      </form>
    </>
  );
}
