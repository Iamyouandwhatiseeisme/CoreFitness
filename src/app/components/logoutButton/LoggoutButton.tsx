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
  // const router = useRouter();
  return props.buttonText === "Loading" ? (
    <div className="h-10 w-20 items-center justify-center flex flex-col mt-2 text-black dark:text-white bg-teal-400 hover:bg-gray-500 dark:bg-header-hover-dark rounded-md cursor-pointer ">
      <ClipLoader color="white"></ClipLoader>
    </div>
  ) : (
    <a href={props.href}>
      <button
        onClick={() => {
          if (props.type === "logout") {
            signOut();
          }
        }}
        className="w-14 h-14 items-center justify-center flex mt-2 text-white dark:text-white rounded-2xl bg-teal-400 hover:bg-teal-500 dark:bg-header-hover-dark cursor-pointer transition-transform duration-300 transform hover:scale-105"
      >
        <CiLogout className="w-10 h-10"></CiLogout>
      </button>
    </a>
  );
}
