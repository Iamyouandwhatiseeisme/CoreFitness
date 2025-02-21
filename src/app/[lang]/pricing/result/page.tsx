"use client";
import { useRouter } from "next/navigation";
import React from "react";

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
  }, [router]);

  return (
    <div className="min-h-wrapper ">
      <h2 className="pt-52">
        Successfull Payement, you will be redirected to home page
      </h2>
    </div>
  );
}
