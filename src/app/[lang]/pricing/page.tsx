import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Plan } from "../../components/types";
import { formatAmountForDisplay } from "../../utils/stripe/stripe-helpers";
import * as config from "../../../config";
import React from "react";

export default function DonatePage(): JSX.Element {
  const plans: Plan[] = [
    {
      reccurence: "Monthly",
      price: 100,
      priceId: process.env.PRICE_ID_MONTHLY!,
      payementFrequency: "Every Month",
    },
    {
      reccurence: "Yearly",
      price: 800,
      priceId: process.env.PRICE_ID_YEARLY!,
      payementFrequency: "Every Year",
    },
  ];

  return (
    <div className="min-h-wrapper flex flex-row items-center justify-center">
      {plans.map((plan) => {
        return (
          <div
            key={plan.price}
            className=" p-10 mt-20 mr-10 ml-10 w-64 h-96 flex flex-col items-center justify-start rounded-2xl border bg-gray-300"
          >
            <div className="border-b w-48 h-24 items-center flex flex-row justify-center border-gray-800 border-opacity-25 rounded-2xl bg-gray-200 shadow-inner shadow-white">
              <CheckoutForm uiMode="hosted" plan={plan}></CheckoutForm>
            </div>
            <div className="p-10 border-b border-gray-800 border-opacity-25">
              Pay {formatAmountForDisplay(plan.price, config.CURRENCY)}{" "}
              {plan.payementFrequency}
            </div>
            <div className=" border-b text-center border-gray-800 border-opacity-25">
              Unlimited access to every branch, trainers, pool
            </div>
          </div>
        );
      })}
    </div>
  );
}
