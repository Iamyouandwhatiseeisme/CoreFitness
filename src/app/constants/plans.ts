import { Plan } from "../components/types";
export const benefitDescriptions: Record<string, string> = {
  "Access to gym":
    "Full access to all gym equipment and facilities. Open 24/7 for your convenience.",
  "Free group classes":
    "Join various fitness classes at no additional cost. Classes are available from 6 AM to 9 PM daily.",
  "1 personal training session per month":
    "Get a one-on-one session with a certified trainer each month. Sessions can be scheduled between 8 AM and 8 PM.",
  "3 personal training sessions per month":
    "Upgrade to three personal training sessions monthly. Sessions can be scheduled between 8 AM and 8 PM.",
  "5 personal training sessions per year":
    "Receive five training sessions spread throughout the year. Sessions can be scheduled between 8 AM and 8 PM.",
  "10 personal training sessions per year":
    "Enhance your fitness with ten yearly training sessions. Sessions can be scheduled between 8 AM and 8 PM.",
  "Unlimited personal training sessions":
    "Enjoy unlimited personal coaching for your best results. Sessions can be scheduled between 8 AM and 8 PM.",
  "Access to pool":
    "Use the swimming pool at any time during operating hours. Pool is open from 6 AM to 10 PM.",
  "Access to spa":
    "Relax with access to spa facilities, including sauna and massages. Spa is open from 9 AM to 9 PM.",
};

export const plans: Plan[] = [
  {
    reccurence: "Monthly",
    price: 100,
    name: "Monthly Plan",
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
    name: "Yearly Plan",
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
    name: "Premium Monthly",
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
    name: "Premium Yearly",
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
    name: "Vip Monthly",
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
    name: "Vip Yearly",
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
