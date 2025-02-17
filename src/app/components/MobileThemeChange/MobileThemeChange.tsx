"use client";

import { useTheme } from "next-themes";
import React from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

export default function MobileThemeChange() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex flex-row h-7 mt-2 w-10 items-center rounded-br-full rounded-bl-full border  rounded-xl p-3 bg-white/5   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 dark:shadow-lg">
      {theme === "system" ? (
        <FaDesktop onClick={() => setTheme("dark")}></FaDesktop>
      ) : theme === "dark" ? (
        <FaMoon onClick={() => setTheme("light")}></FaMoon>
      ) : (
        <FaSun onClick={() => setTheme("system")}></FaSun>
      )}
    </div>
  );
}
