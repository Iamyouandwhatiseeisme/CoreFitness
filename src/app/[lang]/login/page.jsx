"use client";
import { useState } from "react";
import { login, signup } from "./actions";
// import { useUser } from "../providers/UserContext/UserProvider";

export const LogIn = () => {
  const [error, setError] = useState(null);
  //   const { setCurrentUser } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const actionType = e.nativeEvent.submitter.name;

    let result;
    if (actionType === "login") {
      result = await login(formData);
      //   setCurrentUser("user");
    } else if (actionType === "signup") {
      result = await signup(formData);
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
    <div className="items-center flex flex-col pt-10">
      <form
        className="flex flex-col gap-3 w-80 text-white "
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-row w-72 justify-between">
          Email :{" "}
          <input
            id="email"
            name="email"
            className="text-black"
            type="email"
            required
          />
        </div>
        <div className="flex flex-row w-72 justify-between">
          Password :{" "}
          <input
            className="text-black"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button name="login" type="submit">
          Log In
        </button>
        <button name="signup" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default LogIn;
