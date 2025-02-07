"use client";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

import React from "react";
import { plans } from "src/app/constants/plans";
import { DictionaryChapter } from "../dictionaries";
import { useLocale } from "src/app/components/providers/LanguageContext";

export default function DonatePage(): JSX.Element {
  const {
    dictionary: { subscription: subscriptionDict },
  } = useLocale();

  const benefitsChapter = subscriptionDict.benefits as unknown;
  const dictionaryChaPter = benefitsChapter as DictionaryChapter;

  const benefits: Record<string, string> = {
    "Access to gym": dictionaryChaPter.AccessToGym,
    "Free group classes": dictionaryChaPter.FreeGroupClasses,
    "1 personal training session per month":
      dictionaryChaPter.OnePersonalTraining,
    "3 personal training sessions per month":
      dictionaryChaPter.TwoPersonalTraining,
    "5 personal training sessions per year":
      dictionaryChaPter.FivePersonalTraining,
    "10 personal training sessions per year":
      dictionaryChaPter.TenPersonalTraining,
    "Unlimited personal training sessions":
      dictionaryChaPter.UnlimitedPersonalTraining,
    "Access to pool": dictionaryChaPter.AccessToPool,
    "Access to spa": dictionaryChaPter.AccessToSpa,
  };
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
                {subscriptionDict[plan.type]} {subscriptionDict.Subscription}
              </div>
              <div className="w-full border-t border-gray-300 dark:border-gray-700 my-4"></div>
              <div className="w-full text-center mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                {subscriptionDict[plan.payLabel]}
              </div>
              <div className="w-full border-t border-gray-300 dark:border-gray-700 my-4"></div>
              {plan.benefits.map((benefit) => {
                return (
                  <div
                    key={benefit}
                    className="w-full border-b border-b-gray-200/40  p-2 text-center text-gray-600 dark:text-gray-400"
                  >
                    {benefits[benefit]}
                  </div>
                );
              })}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-20 transition-opacity duration-300 hover:opacity-100">
                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"> */}
                <CheckoutForm uiMode="hosted" plan={plan}></CheckoutForm>
                {/* </button> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
