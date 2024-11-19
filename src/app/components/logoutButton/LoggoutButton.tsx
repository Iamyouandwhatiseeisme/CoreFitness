import React from "react";
import { ClipLoader } from "react-spinners";
import { signOut } from "../../[lang]/login/actions";

export default function AuthenticationButton(props: {
  href: string;
  type: string;
  buttonText: string;
  locale: string;
}) {
  return props.buttonText === "Loading" ? (
    <div className="h-10 w-20 items-center justify-center flex flex-col mt-2 text-black dark:text-white bg-gray-400 hover:bg-gray-500 dark:bg-header-hover-dark rounded-md cursor-pointer ">
      <ClipLoader color="white"></ClipLoader>
    </div>
  ) : (
    <a href={props.href}>
      <button
        onClick={() => {
          if (props.type === "logout") {
            signOut(props.locale);
          }
        }}
        className="h-10 w-20 items-center mt-2 text-black dark:text-white bg-gray-400 hover:bg-gray-500 dark:bg-header-hover-dark rounded-md cursor-pointer "
      >
        {props.buttonText}
      </button>
    </a>
  );
}
