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

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);

  return (
    <div className="min-h-wrapper ">
      <h2 className="pt-52">
        Successfull Payement, you will be redirected to home page
      </h2>
    </div>
  );
}
