import React from "react";
import { ClipLoader } from "react-spinners";
import { signOut } from "../../[lang]/login/actions";
import { redirect, useRouter } from "next/navigation";

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
            // router.push(`/${props.locale}/login`);
          }
        }}
        className="h-10 w-20  items-center mt-2 text-white dark:text-white bg-teal-400 hover:bg-teal-500 dark:bg-header-hover-dark rounded-br-full rounded-tl-full cursor-pointer "
      >
        {props.buttonText}
      </button>
    </a>
  );
}
