"use client";
import React from "react";
import { SubscriptionInfoProps, SubscriptionStatus } from "../types";
import { createClient } from "src/app/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function AccountSubscriptionInfo(props: SubscriptionInfoProps) {
  const router = useRouter();
  const subscriptionInfo = props.subscriptionInfo;
  async function handleSubscriptionButton() {
    if (subscriptionInfo.status === SubscriptionStatus.Active) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const response = await fetch("api/subscriptionCancel", {
          headers: {
            email: user.email!,
          },
        });
        if (response.status === 200) {
          const userConfirmed = window.confirm(
            "Are you sure you want to proceed?"
          );
          if (userConfirmed) {
            alert("Subscription Canceled!");
            window.location.reload();
          }
        } else {
          alert("Something went wrong");
        }
      }
    }
    if (subscriptionInfo.status === SubscriptionStatus.Inactive) {
      router.push("/pricing");
    }
  }
  return (
    <div className="flex flex-row gap-5  items-center justify-items-start">
      <label className="w-10">Status:</label>
      <div className="pl-2 cursor-pointer dark:text-black  p-8  w-48 rounded-2xl h-10 bg-white flex flex-col items-center justify-center   ">
        <div> {subscriptionInfo.name}</div>
        <div>
          {subscriptionInfo?.status === SubscriptionStatus.Active
            ? `Active ${new Date(
                subscriptionInfo?.currentPeriodStart * 1000
              ).toLocaleDateString("en-CA", {
                month: "2-digit",
                day: "2-digit",
              })} - ${new Date(
                subscriptionInfo?.currentPeriodEnd * 1000
              ).toLocaleDateString("en-CA", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
              })}`
            : "Inactive"}
        </div>
      </div>

      <button
        className="rounded-2xl border dark:text-black bg-white border-black h-10 w-20"
        onClick={handleSubscriptionButton}
      >
        {subscriptionInfo?.status === SubscriptionStatus.Active
          ? "Cancel"
          : "Subscribe"}
      </button>
    </div>
  );
}
