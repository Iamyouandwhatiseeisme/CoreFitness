"use client";

import { EmailOtpType } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import LoginPageBoard from "src/app/components/LoginPageBoard/LoginPageBoard";
import { createClient } from "src/app/utils/supabase/client";

export default function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isVerified, setIsverified] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter();

  async function handleEmailSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmail("");
    const response = await fetch(`/api/passwordRecovery`, {
      headers: {
        email: email,
      },
    });
    if (response) {
      const responseData = await response.json();
      if (responseData.status === 200) {
        toast("Please check your email address");
      } else {
        toast("Something went wrong, try again later");
      }
    }
  }
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      const urlParams = new URLSearchParams(window.location.search);

      const confirmationUrl = urlParams.get("confirmation_url");
      if (confirmationUrl) {
        const confirmationParams = new URLSearchParams(
          new URL(decodeURIComponent(confirmationUrl)).search
        );
        const token = confirmationParams.get("token");
        const email = confirmationParams.get("email");
        const type = confirmationParams.get("type") as EmailOtpType;
        if (token && email && type) {
          const { data, error } = await supabase.auth.verifyOtp({
            token: token,
            email: email,
            type: type,
          });
          if (data) {
            setIsverified(true);
          }
        }
      }
    });
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
      alert("Password updated successfully!");
      router.push("/login");
    }
  }

  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-row">
      <LoginPageBoard></LoginPageBoard>
      <Toaster></Toaster>
      <div className="items-center justify-center flex flex-col w-full lg:w-1/2 h-full bg-workout-bg">
        {isVerified ? (
          <div className="w-96 p-6 bg-white rounded-lg shadow-md">
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  minLength={6}
                  placeholder="Confirm your new password"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md"
              >
                Reset Password
              </button>
            </form>
          </div>
        ) : (
          <div className="items-center justify-center flex flex-col w-full h-full bg-gray-800 bg-opacity-50 pt-10">
            <div className=" border  rounded-2xl w-96 h-40 flex flex-col items-center  justify-start bg-gray-800 bg-opacity-25 text-white">
              <h2 className="font-bold text-lg mt-10">
                Please provide your Email
              </h2>

              <div className="flex flex-row mt-5 gap-2  ">
                <h2>Email: </h2>
                <form onSubmit={handleEmailSend}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="rounded-sm  border border-gray-400 text-black  pl-2 "
                  ></input>
                  <button
                    className=" w-24 rouned-sm bg-white border border-gray-400 text-black"
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
