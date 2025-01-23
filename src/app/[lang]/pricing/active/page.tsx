"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/client";

export default function ActivePage() {
  const [user, setUser] = useState<User | null>();

  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);
  async function handleCancel() {
    if (user?.email) {
      const response = await fetch("/api/subscriptionCancel/", {
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
