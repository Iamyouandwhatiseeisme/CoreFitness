"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { SubscriptionInfo } from "src/app/components/types";
import UploadImage from "src/app/components/UploadImage/UploadImage";
import EditableInput from "src/app/components/EditableInput/EditableInput";

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

      if (user?.email) {
        const response = await fetch("/api/subscription", {
          headers: {
            email: user?.email,
          },
        });
        if (response.status === 200) {
          const subscriptionData = (await response.json()) as SubscriptionInfo;
          setSubscriptionInfo(subscriptionData);
        } else {
          setSubscriptionInfo(undefined);
        }
      }
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
    <div className="min-h-wrapper flex flex-row items-center justify-center ">
      {user ? (
        <div className=" mt-36 rounded-2xl border border-black w-150  h-150 bg-red-200 flex flex-row  justify-start items-start gap-20">
          <UploadImage></UploadImage>
          <div className="flex m-10 flex-col items-center justify-center w-96">
            <EditableInput
              value={user.email!}
              apiEndpoint="/api/updateEmail"
              updateButtonText="Update"
            ></EditableInput>
            <div>{subscriptionInfo?.status}</div>
            <div>{subscriptionInfo?.currentPeriodEnd}</div>
            <div>{subscriptionInfo?.currentPeriodStart}</div>
            <div
              onClick={() => handleUserDeletion()}
              className=" cursor-pointer w-40 h-10 border rounded-2xl bg-black text-white flex flex-row items-center justify-center"
              data-cy="delete-user-button"
            >
              Delete User
            </div>{" "}
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
