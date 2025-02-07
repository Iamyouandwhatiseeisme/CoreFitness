"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { SubscriptionInfo } from "src/app/components/types";
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
  console.log(profile);
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
        const subscriptionInfo = (await response.json()) as SubscriptionInfo;
        const photoUrl = user.user_metadata.profile_photo;
        const userInfoResponse = await fetch("/api/userInfo");
        if (response) {
          const userInfoResponseData = await userInfoResponse.json();
          const userDisplayName = userInfoResponseData.displayName;
          const userProfile: UserProfile = {
            user: user,
            subscription_info: subscriptionInfo,
            image: photoUrl,
            display_name: userDisplayName,
          };
          setUser(userProfile);
        }
        if (!response) {
          const userProfile: UserProfile = {
            user: user,
            subscription_info: subscriptionInfo,
            image: photoUrl,
            display_name: null,
          };

          setUser(userProfile);
        }

        setLoading(false);
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
        const { error } = await supabase.auth.signOut();
        if (error === null) {
          router.push("/login");
        }
      }
    }
  }
  if (loading) {
    console.log(2);
    return (
      <div className="min-h-wrapper flex   items-center w-full justify-center bg-gradient-to-tl from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40  ">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-wrapper flex   items-center w-full justify-center bg-gradient-to-tl from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40  ">
      {user ? (
        <div
          className="mt-20 rounded-xl dark:text-white text-black border animated-border   
          w-150 h-150 bg-gradient-to-tl from-blue-500/20 to-purple-600/20 
          dark:from-blue-700/20 mb-20 dark:to-purple-700/20 flex flex-row 
          justify-start items-start gap-20 "
        >
          <div className="w-96 flex flex-col z-40 items-center  gap-2 justify-center pl-24 ml-auto mr-auto">
            <UploadImage image={user.image}></UploadImage>
            <h2>{profile.ClickOnImage}</h2>
          </div>
          <ul className="flex m-10 p-10 z-40  flex-col items-start justify-start gap-5 border border-black rounded-2xl h-3/4 w-full">
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
                value={!user.display_name ? "Display name" : user.display_name}
                apiEndpoint="/api/updateUser/updateName"
                updateButtonText={profile.Update}
              />
            </li>
            <hr className="border-gray-300 w-full" />
            {user.subscription_info && (
              <>
                <li className="w-full">
                  <AccountSubscriptionInfo
                    subscriptionInfo={user.subscription_info}
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
              <DeleteUser handleDelete={handleUserDeletion}></DeleteUser>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
        </div>
      )}
    </div>
  );
}
