"use client";
import { useEffect, useRef, useState } from "react";
import { login, signup, signInWithGithub } from "./actions";
import { useLocale } from "../../components/providers/LanguageContext";
import LoginPageBoard from "../../components/LoginPageBoard/LoginPageBoard";
import React from "react";
import Link from "next/link";
import { toast, Toaster } from "sonner";

export default function LogIn() {
  const { locale } = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter as HTMLButtonElement;

    const formData = new FormData(e.target as HTMLFormElement);
    const actionType = submitter.name;

    let result;
    if (actionType === "login") {
      result = await login(formData, locale);
    } else if (actionType === "signup") {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      }
      result = await signup(formData, locale);

      if (formRef.current) {
        formRef.current.reset();
      }
      setPassword("");
      setConfirmPassword("");
      setIsSigningUp(false);
    }
    if (result?.error) {
      setError(result.error);
      alert(result.error);
    } else {
      toast("Successfully registered user!");
      setError(null);
    }
    if (error) {
      alert(error);
    }
  }
  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-row">
      <LoginPageBoard></LoginPageBoard>
      <Toaster></Toaster>

      <div className="items-center justify-center flex flex-col w-full lg:w-1/2 h-full bg-workout-bg">
        <div className="items-center justify-center flex flex-col w-full h-full bg-gray-800 bg-opacity-50 pt-10">
          <div className=" border  rounded-2xl w-96 h-1/2 flex flex-col items-center justify-center bg-white">
            <form
              ref={formRef}
              className="flex flex-col gap-3 w-80 text-black "
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="flex flex-row w-full justify-between">
                <input
                  data-cy="email"
                  id="email"
                  name="email"
                  className="text-black  rounded-lg border-solid border border-gray-200 w-full p-2 "
                  type="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="flex flex-row w-full justify-between">
                <input
                  className="text-black    rounded-lg border-solid border border-gray-200 w-full p-2 "
                  data-cy="password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  minLength={6}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {isSigningUp && (
                <div className="flex flex-row w-full justify-between">
                  <input
                    className="text-black    rounded-lg border-solid border border-gray-200 w-full p-2 "
                    data-cy="confirm-passowrd"
                    type="password"
                    id="password"
                    name="confirm-password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    onInput={() => {
                      setPasswordError("");
                    }}
                    required
                  />
                </div>
              )}
              {passwordError && (
                <div className="text-red-600">{passwordError}</div>
              )}

              <div
                className={`underline  ${
                  !isSigningUp ? "text-end" : "justify-between flex flex-row"
                } `}
              >
                {isSigningUp && (
                  <div
                    className="underline cursor-pointer "
                    onClick={() => {
                      setIsSigningUp(false);
                    }}
                  >
                    Log In
                  </div>
                )}

                <Link
                  href={`/login/passwordRecovery`}
                  className="cursor-pointer"
                >
                  Forgot password
                </Link>
              </div>

              {!isSigningUp && (
                <button
                  data-cy="login-button"
                  name="login"
                  type="submit"
                  className="bg-blue-700 rounded-2xl h-10 font-bold text-white"
                >
                  Log In
                </button>
              )}

              {!isSigningUp && (
                <button
                  data-cy="signup-button"
                  onClick={() => setIsSigningUp(true)}
                  // name="signup"
                  // type="submit"
                  className="bg-green-700 rounded-2xl h-10 font-bold text-white"
                >
                  Sign up
                </button>
              )}
              {isSigningUp && (
                <button
                  data-cy="signup-button"
                  onClick={() => setIsSigningUp(true)}
                  name="signup"
                  type="submit"
                  className="bg-green-700 rounded-2xl h-10 font-bold text-white"
                >
                  Sign up
                </button>
              )}
            </form>
            <button
              className="flex flex-row h-10 w-80 rounded-2xl bg-gray-200 items-center justify-center  cursor-pointer mt-4"
              onClick={() => signInWithGithub()}
            >
              <img
                className="h-10 w-10"
                alt="github"
                src="/images/github-mark.svg"
              ></img>
              <div>Sign in with GitHub</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
