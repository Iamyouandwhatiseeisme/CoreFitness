import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Plan } from "../../components/types";
import { formatAmountForDisplay } from "../../utils/stripe/stripe-helpers";
import * as config from "../../../config";
import React from "react";

export default function DonatePage(): JSX.Element {
  // const plans: Plan[] = [
  //   {
  //     reccurence: "Monthly",
  //     price: 100,
  //     priceId: process.env.PRICE_ID_MONTHLY!,
  //     payementFrequency: "Every Month",
  //   },
  //   {
  //     reccurence: "Yearly",
  //     price: 800,
  //     priceId: process.env.PRICE_ID_YEARLY!,
  //     payementFrequency: "Every Year",
  //   },
  // ];
  const plans: Plan[] = [
    {
      reccurence: "Monthly",
      price: 100,
      priceId: process.env.PRICE_ID_MONTHLY!,
      payementFrequency: "Every Month",
      benefits: [
        "Access to gym",
        "Free group classes",
        "1 personal training session per month",
      ],
    },
    {
      reccurence: "Yearly",
      price: 800,
      priceId: process.env.PRICE_ID_YEARLY!,
      payementFrequency: "Every Year",
      benefits: [
        "Access to gym",
        "Free group classes",
        "5 personal training sessions per year",
        "Access to pool",
      ],
    },
    {
      reccurence: "Premium Monthly",
      price: 150,
      priceId: process.env.PRICE_ID_MONTHLY_PREMIUM!,
      payementFrequency: "Every Month",
      benefits: [
        "Access to gym",
        "Free group classes",
        "3 personal training sessions per month",
        "Access to pool",
      ],
    },
    {
      reccurence: "Premium Yearly",
      price: 1200,
      priceId: process.env.PRICE_ID_YEARLY_PREMIUM!,
      payementFrequency: "Every Year",
      benefits: [
        "Access to gym",
        "Free group classes",
        "10 personal training sessions per year",
        "Access to pool",
        "Access to spa",
      ],
    },
    {
      reccurence: "Vip Monthly",
      price: 200,
      priceId: process.env.PRICE_ID_MONTHLY_VIP!,
      payementFrequency: "Every Month",
      benefits: [
        "Access to gym",
        "Free group classes",
        "Unlimited personal training sessions",
        "Access to pool",
        "Access to spa",
      ],
    },
    {
      reccurence: "Vip Yearly",
      price: 1350,
      priceId: process.env.PRICE_ID_EARYLY_VIP!,
      payementFrequency: "Every Year",
      benefits: [
        "Access to gym",
        "Free group classes",
        "Unlimited personal training sessions",
        "Access to pool",
        "Access to spa",
      ],
    },
  ];

  return (
    <div className="min-h-wrapper flex flex-wrap w-full items-center justify-center gap-8 p-8 bg-gradient-to-tl from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40">
      {plans.map((plan) => {
        return (
          <div key={plan.price}>
            <div
              key={plan.price}
              className="relative p-6 w-80 h-auto min-h-[450px] flex flex-col items-center justify-start rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="w-full flex flex-col items-center justify-center mb-4">
                {plan.reccurence} Subscription
              </div>
              <div className="w-full border-t border-gray-300 dark:border-gray-700 my-4"></div>
              <div className="w-full text-center mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Pay {formatAmountForDisplay(plan.price, config.CURRENCY)}{" "}
                {plan.payementFrequency}
              </div>
              <div className="w-full border-t border-gray-300 dark:border-gray-700 my-4"></div>
              {plan.benefits.map((benefit) => {
                return (
                  <div
                    key={benefit}
                    className="w-full border-b border-b-gray-200/40  p-2 text-center text-gray-600 dark:text-gray-400"
                  >
                    {benefit}
                  </div>
                );
              })}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-20 transition-opacity duration-300 hover:opacity-100">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                  <CheckoutForm uiMode="hosted" plan={plan}></CheckoutForm>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
