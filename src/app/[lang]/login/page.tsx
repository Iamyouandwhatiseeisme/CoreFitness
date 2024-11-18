"use client";
import { BaseSyntheticEvent, useState } from "react";
import { login, signup } from "./actions";
import { useLocale } from "../../components/providers/LanguageContext";
import LoginPageBoard from "../../components/LoginPageBoard/LoginPageBoard";
import { useUser } from "../../components/providers/UserProvider";
import { redirect } from "next/navigation";
import { SubmitTarget } from "react-router-dom/dist/dom";
export const LogIn = () => {
  const { locale } = useLocale();
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  if (user !== null) {
    redirect(`/${locale}`);
  }

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
      result = await signup(formData, locale);
      alert("confirmation email sent");
    }

    if (result?.error) {
      setError(result.error);
      alert(result.error);
    } else {
      setError(null);
    }
  }
  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-row">
      <LoginPageBoard></LoginPageBoard>

      <div className="items-center justify-center flex flex-col w-full lg:w-1/2 h-full bg-workout-bg">
        <div className="items-center justify-center flex flex-col w-full h-full bg-gray-800 bg-opacity-50 pt-10">
          <div className=" border  rounded-2xl w-96 h-1/2 flex flex-col items-center justify-center bg-white">
            <form
              className="flex flex-col gap-3 w-80 text-black "
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="flex flex-row w-full justify-between">
                <input
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
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                name="login"
                type="submit"
                className="bg-blue-700 rounded-sm h-10 font-bold text-white"
              >
                Log In
              </button>
              <button
                name="signup"
                type="submit"
                className="bg-green-700 rounded-sm h-10 font-bold text-white"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
