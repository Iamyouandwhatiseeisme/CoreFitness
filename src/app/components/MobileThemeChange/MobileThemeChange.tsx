"use client";

import { useTheme } from "next-themes";
import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function MobileThemeChange() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setIsChecked(!isChecked);
    setTheme(isChecked ? "light" : "dark");
  };

  return (
    <div className="flex flex-row h-7 mt-2 w-10 items-center rounded-br-full rounded-bl-full border  rounded-xl p-3 bg-white/5   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 dark:shadow-lg">
      {isChecked ? (
        <FaMoon onClick={toggleTheme}></FaMoon>
      ) : (
        <FaSun onClick={toggleTheme}></FaSun>
      )}
    </div>
  );
}
