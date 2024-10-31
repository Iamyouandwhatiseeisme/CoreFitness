"use client";
import { useRouter } from "next/navigation";
import { logout } from "../../util/logout";
import "./logout.css";
import React from "react";

export default function LoggoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      router.push("/login");
    } else {
      alert(result.message || "Logout failed.");
    }
  };
  return (
    <button
      className="h-10 w-20 items-center mt-2 text-black dark:text-white bg-gray-400 hover:bg-gray-500 dark:bg-header-hover-dark rounded-md cursor-pointer "
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}
