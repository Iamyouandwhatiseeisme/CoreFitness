import { Plan } from "../components/types";

export const plans: Plan[] = [
  {
    reccurence: "Monthly",
    price: 100,
    type: "Monthly",
    payLabel: "Pay100",

    name: "Monthly Plan",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_MONTHLY!,
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
    payLabel: "Pay800",
    type: "Yearly",
    name: "Yearly Plan",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_YEARLY!,
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
    type: "PremiumMonthly",
    payLabel: "Pay150",

    name: "Premium Monthly",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_MONTHLY_PREMIUM!,
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
    type: "PremiumYearly",
    price: 1200,
    payLabel: "Pay1200",

    name: "Premium Yearly",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_YEARLY_PREMIUM!,
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
    type: "VipMonthly",
    payLabel: "Pay200",

    price: 200,
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_MONTHLY_VIP!,
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
    type: "VipYearly",
    payLabel: "Pay1350",

    price: 1350,
    name: "Vip Yearly",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_YEARLY_VIP!,
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
