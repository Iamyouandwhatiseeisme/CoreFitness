"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { SubscriptionInfo, SubscriptionStatus } from "src/app/components/types";
import UploadImage from "src/app/components/UploadImage/UploadImage";
import EditableInput from "src/app/components/EditableInput/EditableInput";
import AccountSubscriptionInfo from "src/app/components/ProfileSubscriptionInfo/AccountSubscriptionInfo";
import ChangePassword from "src/app/components/ChangePassword/ChangePassword";

export default function Profile() {
  const [user, setUser] = useState<User | null>();
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>();
  const [loading, setLoading] = useState(true);
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
        console.log(response, "subscription");
        if (response.status === 200) {
          const subscriptionData = (await response.json()) as SubscriptionInfo;
          console.log(subscriptionData);
          setSubscriptionInfo(subscriptionData);
        } else {
          const currentUserSubscriptionInfo: SubscriptionInfo = {
            status: SubscriptionStatus.Inactive,
            currentPeriodStart: 0,
            currentPeriodEnd: 0,
          };
          setSubscriptionInfo(currentUserSubscriptionInfo);
          setLoading(false);
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
      const responseData = await response.json();
      if (responseData.user === null) {
        router.push("/login");
      }
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-wrapper flex flex-row items-center justify-center ">
      {user ? (
        <div className=" mt-36 rounded-2xl border border-black w-150  h-150 bg-gray-200 flex flex-row  justify-start items-start gap-20">
          <div className="w-96">
            {" "}
            <UploadImage></UploadImage>
          </div>
          <ul className="flex m-10 p-10 flex-col items-start justify-start gap-5 border border-black rounded-2xl h-3/4 w-full">
            <li className="w-full">
              <EditableInput
                label="Email:"
                value={user.email!}
                apiEndpoint="/api/updateEmail"
                updateButtonText="Update"
              />
            </li>
            <hr className="border-gray-300 w-full" />
            {subscriptionInfo && (
              <>
                <li className="w-full">
                  <AccountSubscriptionInfo
                    subscriptionInfo={subscriptionInfo}
                  />
                </li>
                <hr className="border-gray-300 w-full" />
              </>
            )}
            <li className="w-full">
              <ChangePassword></ChangePassword>
            </li>
            <hr className="border-gray-300 w-full" />
            <li className="w-full">
              <div
                onClick={() => handleUserDeletion()}
                className="cursor-pointer w-40 h-10 border rounded-2xl bg-black text-white flex flex-row items-center justify-center"
                data-cy="delete-user-button"
              >
                Delete User
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
