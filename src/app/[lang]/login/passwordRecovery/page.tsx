"use client";

import { EmailOtpType } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import LoginPageBoard from "src/app/components/LoginPageBoard/LoginPageBoard";
import { useLocale } from "src/app/components/providers/LanguageContext";
import { createClient } from "src/app/utils/supabase/client";

export default function PtrueasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isVerified, setIsverified] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter();
  const {
    dictionary: { toast: toastDict },
    locale,
  } = useLocale();

  async function handleEmailSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmail("");
    const response = await fetch(`/api/passwordRecovery`, {
      headers: {
        email: email,
        locale: locale,
      },
    });
    if (response) {
      const responseData = await response.json();
      if (responseData.status === 200) {
        toast(toastDict.CheckEmail);
      } else {
        toast(toastDict.SomethingWrong);
      }
    }
  }
  useEffect(() => {
    async function checkVerified() {
      const urlParams = new URLSearchParams(window.location.search);

      const token_hash = urlParams.get("token_hash");
      const type = urlParams.get("type") as EmailOtpType;
      if (type && token_hash) {
        const { data } = await supabase.auth.verifyOtp({
          token_hash: token_hash,
          type: type,
        });
        if (data.session) {
          setIsverified(true);
        }
      }
    }

    checkVerified();
    // });
  }, []);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 6 || confirmPassword.length < 6) {
      setPasswordError("Passwords must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (data) {
      toast("Password updated successfully!");
      router.push("/login");
    }
  }

  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-row">
      <LoginPageBoard></LoginPageBoard>
      <Toaster></Toaster>
      <div className="items-center justify-center flex flex-col w-full lg:w-1/2 h-full bg-workout-bg p-4">
        {isVerified ? (
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

            {passwordError && (
              <p className="text-red-500 mb-4">{passwordError}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                  placeholder="Enter your new password"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                  placeholder="Confirm your new password"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Reset Password
              </button>
            </form>
          </div>
        ) : (
          <div className="items-center justify-center flex flex-col w-full h-full  bg-opacity-50 pt-10">
            <div className="border rounded-2xl w-full max-w-md h-40 flex flex-col items-center justify-start bg-gray-800 bg-opacity-25 text-white p-4">
              <h2 className="font-bold text-lg mt-2">
                Please provide your Email
              </h2>

              <div className="flex flex-row mt-5 gap-2 w-full">
                <h2>Email: </h2>
                <form
                  onSubmit={handleEmailSend}
                  className="flex flex-row gap-2 w-full"
                >
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="flex-grow rounded-sm bg-white  border border-gray-400 text-black pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></input>
                  <button
                    className="w-24 rounded-sm bg-white border border-gray-400 text-black hover:bg-gray-200 transition duration-300"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
