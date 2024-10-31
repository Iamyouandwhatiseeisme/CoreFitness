"use client";
import "./Header.css";
import Link from "next/link";
import LoggoutButton from "../logoutButton/LoggoutButton";
import Logo from "../../../../public/images/Header Logo.webp";
import DropDown from "../DropDown/DropDown";
import { cilSun, cilMoon, cilScreenDesktop, cilSync } from "@coreui/icons";
import { useEffect, useState } from "react";

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(cilSync);

  useEffect(() => {
    function checkTheme() {
      const systemSetting = localStorage.getItem("system");
      const theme = localStorage.getItem("theme");

      if (systemSetting === "true") {
        setCurrentTheme(cilScreenDesktop);
      } else if (systemSetting === "false") {
        setCurrentTheme(theme === "dark" ? cilMoon : cilSun);
      }
    }

    checkTheme();
  }, []);

  const themeOptions = [
    {
      label: "light",
      icon: cilSun,
      changeTheme: () => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("system", false);
        setCurrentTheme(cilSun);
      },
    },
    {
      label: "dark",
      icon: cilMoon,
      changeTheme: () => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("system", false);

        setCurrentTheme(cilMoon);
      },
    },
    {
      label: "system",
      icon: cilScreenDesktop,
      changeTheme: () => {
        localStorage.setItem("system", true);
        localStorage.removeItem("theme");

        setCurrentTheme(cilScreenDesktop);
      },
    },
  ];
  const themeHandler = () => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };
  useEffect(() => {
    if (currentTheme !== cilScreenDesktop) return;
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    themeQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      themeQuery.removeEventListener("change", handleSystemThemeChange);
  }, [currentTheme]);

  const listItemStyle =
    "text-black hover:bg-gray-400 dark:hover:bg-header-hover-dark font-serif font-normal dark:text-yellow-500 p-4 text-center transition-header-hover-transition cursor-pointer";

  return (
    <header className="flex flex-row justify-between bg-neutral-300 dark:bg-dark-header  w-auto  ">
      <div className="flex gap-38">
        <Link
          href="/"
          className="mt-1 pr-2 w-14 h-14 bg-transparent hover:bg-gray-400 cursor-pointer  rounded-full dark:hover:bg-header-hover-dark  items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <nav>
          <ul className="gap-5 flex mr-12  list-none">
            <li className={listItemStyle}>Equipment</li>
            <li className={listItemStyle}>Trainers</li>
            <li className={listItemStyle}>Certificates</li>
            <li className={listItemStyle}>Schedules</li>
            <li className={listItemStyle}>Locations </li>
            <Link href="/profile">
              <li className={listItemStyle}>Profile</li>
            </Link>
            <Link href="/settings">
              <li className={listItemStyle}>Settings</li>
            </Link>
            <Link href="/cart">
              <li className={listItemStyle}>Cart</li>
            </Link>
            <Link href="/blog">
              <li className={listItemStyle}>Blog</li>
            </Link>
            <Link href="/products">
              <li className={listItemStyle}>Products</li>
            </Link>
            <Link href="/posts">
              <li className={listItemStyle}>Posts</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="pr-20 flex flex-row items-center gap-6">
        <DropDown
          content={themeOptions}
          buttonText={currentTheme}
          toggleHandler={themeHandler}
          type="Theme"
        ></DropDown>
        <div className="mb-2  ">
          <LoggoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
