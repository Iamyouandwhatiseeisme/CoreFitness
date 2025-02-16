import React from "react";
import { ClipLoader } from "react-spinners";
import { signOut } from "../../[lang]/login/actions";
import { CiLogout } from "react-icons/ci";

interface AuthenticationButtonProps {
  href: string;
  type: string;
  buttonText: string;
  locale: string;
}
export default function AuthenticationButton(props: AuthenticationButtonProps) {
  return props.buttonText === "Loading" ? (
    <div className="h-10 w-20 items-center justify-center flex flex-col sm:mt-2 text-black dark:text-white bg-white/20 border-[#5A5B5C] hover:border  hover:border-blue-200 shadow-sm shadow-blue-400/20 dark:shadow-yellow-400/20 dark:hover:bg-[#4E4F50]  hover:bg-white/40 hover:scale-105 transition-all duration-300  rounded-md cursor-pointer ">
      <ClipLoader color="white"></ClipLoader>
    </div>
  ) : (
    <a href={props.href}>
      <button
        onClick={() => {
          signOut();
        }}
        className="sm:w-14 sm:h-14 w-8 h-8 items-center ml-6 sm:ml-0 justify-center flex sm:mt-2 text-black dark:text-white bg-white/20 border-[#5A5B5C]   shadow-sm shadow-blue-400/20 dark:shadow-yellow-400/20 dark:hover:bg-[#4E4F50]  hover:bg-white/40 hover:scale-105 transition-all duration-300  rounded-md cursor-pointer"
      >
        <CiLogout className="w-10 h-10"></CiLogout>
      </button>
    </a>
  );
}
