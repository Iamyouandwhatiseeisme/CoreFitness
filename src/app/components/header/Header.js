"use client";
import "./Header.css";
import Link from "next/link";
import Logo from "../../../../public/images/Header Logo.webp";
import DropDown from "../DropDown/DropDown";
import { cilSun, cilMoon, cilScreenDesktop, cilSync } from "@coreui/icons";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CSpinner } from "@coreui/react";
import AuthenticationButton from "../logoutButton/LoggoutButton";
import { useTranslation } from "react-i18next";
import i18next from "../../../i18n";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, error, isLoading } = useUser();
  const [currentTheme, setCurrentTheme] = useState(cilSync);
  const lngs = ["en", "ka"];
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
  console.log("render");

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
    "text-black hover:bg-gray-400 dark:hover:bg-header-hover-dark hover:rounded-3xl font-serif font-normal dark:text-yellow-500 p-5 text-center transition-header-hover-transition cursor-pointer";

  return (
    <header className="flex flex-row justify-between bg-neutral-300 dark:bg-dark-header  w-full overflow-hidden  ">
      <div className="flex gap-38  pt-5 pb-5 pr-5">
        <Link
          href="/"
          className="mt-4 pr-2 w-14 h-14 bg-transparent  cursor-pointer items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <nav className="rounded-3xl flex- flex-row  border border-solid dark:border-header-hover-dark h-20 items-center p-2  hidden sm:block">
          <ul className="gap-5 flex  list-none flex-row">
            <li className={listItemStyle}>{t("Equipment")}</li>
            <li className={listItemStyle}>{t("Trainers")}</li>
            <li className={listItemStyle}>{t("Certificates")}</li>
            <li className={listItemStyle}>{t("Schedules")}</li>
            <li className={`${listItemStyle} hidden l:block`}>
              {t.Locations}{" "}
            </li>
            <Link href="/profile">
              <li className={`${listItemStyle} hidden xl:block`}>
                {t("Profile")}
              </li>
            </Link>

            <Link href="/blog">
              <li className={`${listItemStyle} hidden xl:block`}>
                {t("Blog")}
              </li>
            </Link>
            <Link href="/products">
              <li className={`${listItemStyle} hidden xl:block`}>
                {t("Products")}
              </li>
            </Link>
            <Link href="/posts">
              <li className={`${listItemStyle} hidden xl:block`}>
                {t("Posts")}
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="pr-20 flex flex-row items-center gap-6">
        {lngs.map((lng) => {
          return (
            <button key={lng} onClick={() => i18next.changeLanguage(lng)}>
              {lng}
            </button>
          );
        })}
        <DropDown
          content={themeOptions}
          buttonText={currentTheme}
          toggleHandler={themeHandler}
          type="Theme"
        ></DropDown>
        <div className="mb-2  ">
          {isLoading ? (
            <CSpinner variant="grow" />
          ) : user ? (
            <AuthenticationButton
              href="/api/auth/logout"
              type="logout"
              buttonText={t("Logout")}
            ></AuthenticationButton>
          ) : (
            <AuthenticationButton
              href="/api/auth/login"
              type="login"
              buttonText={t("Login")}
            ></AuthenticationButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
