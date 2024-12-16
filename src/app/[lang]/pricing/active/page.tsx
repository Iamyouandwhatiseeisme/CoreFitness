"use client";
import React from "react";
import { useUser } from "../../../components/providers/UserProvider";
import { useRouter } from "next/navigation";

export default function ActivePage() {
  const router = useRouter();
  const { user } = useUser();
  async function handleCancel() {
    if (user?.email) {
      const response = await fetch("/api/subscription/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: user?.email,
        },
      });
      if (response.status === 200) {
        router.push("/pricing");
      }
    }
  }
  return (
    <div className="min-h-wrapper pt-52">
      You have purchased our subscription
      <div className="cursor-pointer" onClick={handleCancel}>
        Cancel subscription
      </div>
    </div>
  );
}
