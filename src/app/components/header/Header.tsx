"use client";
import "./Header.css";
import Link from "next/link";
import Logo from "../../../../public/images/Header Logo.webp";
import DropDown from "../DropDown/DropDown";
import AuthenticationButton from "../logoutButton/LoggoutButton";
import { useLocale } from "../providers/LanguageContext";

import LocaleChange from "../LanguageChange/LanguageChange";
import { User } from "@supabase/supabase-js";
import { DictionaryChapter } from "../../[lang]/dictionaries";
import useTheme from "../../hooks/useTheme";

const Header = (props: {
  dict: DictionaryChapter;
  currentUser: User | null;
}) => {
  const { locale, setLocale } = useLocale();
  const { currentTheme, themeOptions, themeHandler } = useTheme();
  // const [currentTheme, setCurrentTheme] = useState(cilSync);

  // useEffect(() => {
  //   function checkTheme() {
  //     const systemSetting = localStorage.getItem("system");
  //     const theme = localStorage.getItem("theme");

  //     if (systemSetting === "true") {
  //       setCurrentTheme(cilScreenDesktop);
  //     } else if (systemSetting === "false") {
  //       setCurrentTheme(theme === "dark" ? cilMoon : cilSun);
  //     }
  //   }

  //   checkTheme();
  // }, []);

  // const themeOptions = [
  //   {
  //     label: "light",
  //     icon: cilSun,
  //     changeTheme: () => {
  //       localStorage.setItem("theme", "light");
  //       localStorage.setItem("system", "false");
  //       setCurrentTheme(cilSun);
  //     },
  //   },
  //   {
  //     label: "dark",
  //     icon: cilMoon,
  //     changeTheme: () => {
  //       localStorage.setItem("theme", "dark");
  //       localStorage.setItem("system", "false");

  //       setCurrentTheme(cilMoon);
  //     },
  //   },
  //   {
  //     label: "system",
  //     icon: cilScreenDesktop,
  //     changeTheme: () => {
  //       localStorage.setItem("system", "true");
  //       localStorage.removeItem("theme");

  //       setCurrentTheme(cilScreenDesktop);
  //     },
  //   },
  // ];
  // useEffect(() => {
  //   const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   if (!localStorage.getItem("theme")) {
  //     localStorage.setItem("theme", theme ? "dark" : "light");
  //     localStorage.setItem("system", "true");
  //   }
  //   document.documentElement.classList.toggle(
  //     "dark",
  //     localStorage.theme === "dark" ||
  //       (!("theme" in localStorage) &&
  //         window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   );
  // }, []);
  // const themeHandler = () => {
  //   document.documentElement.classList.toggle(
  //     "dark",
  //     localStorage.theme === "dark" ||
  //       (!("theme" in localStorage) &&
  //         window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   );
  // };
  // useEffect(() => {
  //   if (currentTheme !== cilScreenDesktop) return;
  //   const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   const handleSystemThemeChange = (e) => {
  //     const newTheme = e.matches ? "dark" : "light";
  //     document.documentElement.classList.toggle("dark", newTheme === "dark");
  //   };
  //   themeQuery.addEventListener("change", handleSystemThemeChange);
  //   return () =>
  //     themeQuery.removeEventListener("change", handleSystemThemeChange);
  // }, [currentTheme]);

  const listItemStyle =
    "text-black hover:bg-gray-400 dark:hover:bg-header-hover-dark hover:rounded-3xl font-serif font-normal dark:text-yellow-500 p-5 text-center transition-header-hover-transition cursor-pointer";

  return (
    <header className="flex flex-row justify-between bg-neutral-300 dark:bg-dark-header  w-full overflow-hidden  z-20 ">
      <div className="flex gap-38  pt-5 pb-5 pr-5">
        <Link
          href={`/${locale}`}
          className="mt-4 pr-2 w-14 h-14 bg-transparent  cursor-pointer items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <nav className="rounded-3xl flex- flex-row  border border-solid dark:border-header-hover-dark h-20 items-center p-2  hidden sm:block">
          <ul className="gap-5 flex  list-none flex-row">
            <li className={listItemStyle}>{props.dict.Equipment}</li>
            <li className={listItemStyle}>{props.dict.Trainers}</li>
            <li className={listItemStyle}>{props.dict.Certificates}</li>
            <li className={listItemStyle}>{props.dict.Schedules}</li>
            <li className={`${listItemStyle} hidden l:block`}>
              {props.dict.Locations}
            </li>
            <Link href={`/${locale}/profile`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {props.dict.Profile}
              </li>
            </Link>

            <Link href={`/${locale}/blog`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {props.dict.Blog}
              </li>
            </Link>
            <Link href={`/${locale}/products`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {props.dict.Products}
              </li>
            </Link>
            <Link href={`/${locale}/posts`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {props.dict.Posts}
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row gap-2 items-center mr-5 justify-center z-10">
        <LocaleChange></LocaleChange>
        <div>
          <DropDown
            content={themeOptions}
            buttonText={currentTheme}
            toggleHandler={themeHandler}
            type="Theme"
          ></DropDown>
        </div>
        <div className="mb-2  ">
          {props.currentUser === null ? (
            <AuthenticationButton
              href={`/${locale}/login`}
              type="login"
              buttonText={props.dict.Login}
            />
          ) : (
            <AuthenticationButton
              href={`/${locale}/login`}
              type="logout"
              buttonText={props.dict.Logout}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
