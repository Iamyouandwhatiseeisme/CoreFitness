"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { SubscriptionInfo } from "src/app/components/types";

export default function Profile() {
  const [user, setUser] = useState<User | null>();
  const [subscriptionInfo, setSubscriptionInfo] = useState<
    SubscriptionInfo | undefined
  >();
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      try {
        if (user?.email) {
          const response = await fetch("/api/subscription", {
            headers: {
              email: user?.email,
            },
          });
          if (response.status === 200) {
            const subscriptionData =
              (await response.json()) as SubscriptionInfo;
            console.log(subscriptionData);
            setSubscriptionInfo(subscriptionData);
          } else {
            setSubscriptionInfo(undefined);
          }
        }
      } catch (error) {}
    }
    if (!user) {
      fetchUser();
    }
  }, []);
  async function handleUserDeletion() {
    const response = await fetch("/api/deleteUser");
    if (response.ok) {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-wrapper">
      <div className="pt-40">
        {user ? (
          <>
            <div>{user.email}</div>
            <div
              onClick={() => handleUserDeletion()}
              className=" cursor-pointer w-40 h-10 border rounded-2xl bg-black text-white flex flex-row items-center justify-center"
              data-cy="delete-user-button"
            >
              Delete User
            </div>
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}
