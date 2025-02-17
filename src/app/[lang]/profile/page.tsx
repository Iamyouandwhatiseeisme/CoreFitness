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
import DeleteUser from "src/app/components/DeleteUser/DeleteUser";
import { useLocale } from "src/app/components/providers/LanguageContext";

interface UserProfile {
  user: User;
  display_name: string | null;
  image: string | null;
  subscription_info: SubscriptionInfo;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const {
    dictionary: { profile },
  } = useLocale();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        const response = await fetch("/api/subscription", {
          headers: {
            email: user?.email,
          },
        });
        const subscriptionInfo = await response.json();

        const photoUrl = user.user_metadata.profile_photo;
        const userInfoResponse = await fetch("/api/userInfo");

        if (response.status === 200) {
          const userInfoResponseData = await userInfoResponse.json();
          const userDisplayName = userInfoResponseData.displayName;
          setUser({
            user,
            subscription_info: subscriptionInfo,
            image: photoUrl,
            display_name: userDisplayName,
          });
        } else {
          setUser({
            user,
            subscription_info: {
              status: SubscriptionStatus.Inactive,
              currentPeriodEnd: 0,
              currentPeriodStart: 0,
              name: "",
            },
            image: photoUrl,
            display_name: null,
          });
        }
        setLoading(false);
      }
    }
    if (!user) {
      fetchUser();
    }
  }, [supabase.auth, user]);

  async function handleUserDeletion() {
    const response = await fetch("/api/deleteUser");
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.user === null) {
        const { error } = await supabase.auth.signOut();
        if (!error) router.push("/login");
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gradient-to-tl from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : user ? (
        <div className="mt-10 w-full shadow-sm shadow-black max-w-4xl bg-gradient-to-tl  from-blue-500/20 to-purple-600/20 dark:from-blue-700/20 dark:to-purple-700/20 rounded-xl p-6 flex flex-col md:flex-row gap-10">
          <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
            <UploadImage image={user.image} />
            <h2 className="text-center">{profile.ClickOnImage}</h2>
          </div>

          <ul className="flex flex-col w-full md:w-2/3 gap-5 pt-4 pr-4 border border-gray-200/20 shadow-sm shadow-black rounded-2xl">
            <li className="w-full ">
              <EditableInput
                label={profile.Email}
                value={user.user.email!}
                apiEndpoint="/api/updateUser/updateEmail"
                updateButtonText={profile.Update}
              />
            </li>
            <li className="w-full">
              <EditableInput
                label={profile.Name}
                value={user.display_name ?? "Display name"}
                apiEndpoint="/api/updateUser/updateName"
                updateButtonText={profile.Update}
              />
            </li>
            <hr className="border-gray-300 w-full" />
            {user.subscription_info && (
              <li className="w-full">
                <AccountSubscriptionInfo
                  subscriptionInfo={user.subscription_info}
                />
              </li>
            )}
            <hr className="border-gray-300 w-full" />

            <li className="w-full flex flex-col md:flex-row md:items-center md:justify-center gap-5">
              <ChangePassword />
              <DeleteUser handleDelete={handleUserDeletion} />
            </li>
            <hr className="border-gray-300 w-full" />
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
    </div>
  );
}
