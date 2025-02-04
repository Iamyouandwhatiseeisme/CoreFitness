import React from "react";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
type ReturnBackButtonProps = {
  destination: string;
};
type NotFoudnProps = {
  page: string;
};
export function ReturnBackButton(props: ReturnBackButtonProps) {
  return (
    <Link
      className="flex flex-col items-center p-6 m-8 transition duration-300 ease-in-out transform hover:scale-110"
      href={`/${props.destination}`}
    >
      <PiArrowLeft size={100} />
    </Link>
  );
}

export default function NotFound(props: NotFoudnProps) {
  return (
    <div className="flex flex-col items-center border border-solid rounded-50 border-black">
      <h1 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
        Oops! Page Not Found
      </h1>
      <p className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
        The page you are looking for does not exist.
      </p>
      <ReturnBackButton destination={props.page} />
    </div>
  );
}
