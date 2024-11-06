import "./logout.css";
import React from "react";
import { ClipLoader } from "react-spinners";

export default function AuthenticationButton({ href, type, buttonText }) {
  return buttonText === "Loading" ? (
    <div className="h-10 w-20 items-center justify-center flex flex-col mt-2 text-black dark:text-white bg-gray-400 hover:bg-gray-500 dark:bg-header-hover-dark rounded-md cursor-pointer ">
      <ClipLoader color="white"></ClipLoader>
    </div>
  ) : (
    <a href={href}>
      <button className="h-10 w-20 items-center mt-2 text-black dark:text-white bg-gray-400 hover:bg-gray-500 dark:bg-header-hover-dark rounded-md cursor-pointer ">
        {buttonText}
      </button>
    </a>
  );
}
