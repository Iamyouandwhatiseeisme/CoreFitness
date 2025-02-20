"use client";
import { useRef, useState } from "react";
import { login, signup, signInWithGithub, signInWithGoogle } from "./actions";
import { useLocale } from "../../components/providers/LanguageContext";
import LoginPageBoard from "../../components/LoginPageBoard/LoginPageBoard";
import React from "react";
import Link from "next/link";
import { toast, Toaster } from "sonner";

export default function LogIn() {
  const { locale } = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [isOnSignup, setisOnSignup] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const {
    dictionary: { toast: toastDict },
  } = useLocale();

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter as HTMLButtonElement;

    const formData = new FormData(e.target as HTMLFormElement);
    const actionType = submitter.name;

    let result;
    if (actionType === "login") {
      setIsLoggingIn(true);
      result = await login(formData, locale);
    } else if (actionType === "signup") {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      }
      if (password === confirmPassword) {
        setIsSigningUp(true);
        result = await signup(formData, locale);
        if (result.success) {
          setIsSigningUp(false);
        } else {
          setIsSigningUp(false);
          toast("Something went wrong");
        }
      }

      if (formRef.current) {
        formRef.current.reset();
      }
      setPassword("");
      setConfirmPassword("");
      setisOnSignup(false);
    }
    if (result?.error) {
      setError(result.error);
    } else {
      if (actionType === "login") {
        toast(toastDict.Login);
      }
      if (actionType === "signup") {
        toast(toastDict.Register);
      }
      setError(null);
    }
    if (error) {
      setError(error);
    }
  }
  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-col lg:flex-row">
      <LoginPageBoard></LoginPageBoard>
      <Toaster></Toaster>

      <div className="items-center justify-center flex flex-col w-full lg:w-1/2 h-full bg-workout-bg">
        <div className="items-center justify-center flex flex-col w-full h-full bg-gray-800 bg-opacity-50 pt-10">
          <div className="border rounded-2xl w-11/12 sm:w-96 h-auto flex flex-col items-center justify-center bg-white p-6">
            <form
              ref={formRef}
              className="flex flex-col gap-3 w-full text-black"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="flex flex-row w-full justify-between">
                <input
                  data-cy="email"
                  id="email"
                  name="email"
                  className="text-black rounded-lg border-solid border bg-white border-gray-200 w-full p-2"
                  type="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="flex flex-row w-full justify-between">
                <input
                  className="text-black rounded-lg border-solid border bg-white  border-gray-200 w-full p-2"
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
              {error && <div className="text-xs text-red-500">{error}</div>}

              {isOnSignup && (
                <div className="flex flex-row w-full justify-between">
                  <input
                    className="text-black rounded-lg border-solid border bg-white border-gray-200 w-full p-2"
                    data-cy="confirm-password"
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
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
              {isSigningUp && (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-green-700"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing Up...
                </div>
              )}
              {passwordError && (
                <div className="text-red-600">{passwordError}</div>
              )}

              <div
                className={`underline ${
                  !isOnSignup ? "text-end" : "justify-between flex flex-row"
                }`}
              >
                {isOnSignup && (
                  <div
                    className="underline cursor-pointer"
                    onClick={() => {
                      setisOnSignup(false);
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

              {!isOnSignup && (
                <button
                  data-cy="login-button"
                  name="login"
                  type="submit"
                  className={`bg-blue-700 rounded-2xl h-10 font-bold text-white transform transition-transform duration-300 hover:scale-105 hover:bg-blue-800 ${
                    isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isOnSignup}
                >
                  {isLoggingIn ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging In...
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>
              )}

              {!isOnSignup && (
                <button
                  data-cy="signup-button"
                  onClick={() => setisOnSignup(true)}
                  className="bg-green-700 rounded-2xl h-10 font-bold text-white transform transition-transform duration-300 hover:scale-105 hover:bg-green-800"
                >
                  Sign up
                </button>
              )}
              {isOnSignup && (
                <button
                  data-cy="signup-button"
                  onClick={() => setisOnSignup(true)}
                  name="signup"
                  type="submit"
                  className="bg-green-700 rounded-2xl h-10 font-bold text-white transform transition-transform duration-300 hover:scale-105 hover:bg-green-800"
                >
                  Sign up
                </button>
              )}
            </form>
            <button
              className="flex flex-row h-10 w-full sm:w-80 rounded-2xl bg-gray-200 items-center justify-center cursor-pointer mt-4 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-300"
              onClick={() => signInWithGithub()}
            >
              <img
                className="h-10 w-10"
                alt="github"
                src="/images/github-mark.svg"
              ></img>
              <div>Sign in with GitHub</div>
            </button>
            <button
              className="flex flex-row h-10 w-full sm:w-80 rounded-2xl bg-gray-200 items-center justify-center cursor-pointer mt-4 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-300"
              onClick={() => signInWithGoogle()}
            >
              
              <div>Sign in with google</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
