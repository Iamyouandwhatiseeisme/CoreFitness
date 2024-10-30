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

    // Only execute the checkTheme function after the component has mounted
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
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        localStorage.setItem("theme", theme === true ? "dark" : "light");
        localStorage.setItem("system", true);

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

  return (
    <header className="header flex-row justify-between bg-white dark:bg-dark-header  ">
      <div className="flex gap-38">
        <img
          src={Logo.src}
          alt="logo"
          style={{
            paddingTop: "15px",
            fill: "white",
            width: "50px",
            height: "50px",
            backgroundColor: "transparent",
          }}
        ></img>
        <nav>
          <ul className="navigation-links gap-5">
            <li className="text-yellow-500">Equipment</li>
            <li className="text-yellow-500">Trainers</li>
            <li className="text-yellow-500">Certificates</li>
            <li className="text-yellow-500">Schedules</li>
            <li className="text-yellow-500">Locations </li>
            <Link href="/profile">
              <li className="text-yellow-500">Profile</li>
            </Link>
            <Link href="/settings">
              <li className="text-yellow-500">Settings</li>
            </Link>
            <Link href="/cart">
              <li className="text-yellow-500">Cart</li>
            </Link>
            <Link href="/blog">
              <li className="text-yellow-500">Blog</li>
            </Link>
            <Link href="/products">
              <li className="text-yellow-500">Products</li>
            </Link>
            <Link href="/posts">
              <li className="text-yellow-500">Posts</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="pr-20 flex flex-row items-center gap-10">
        <DropDown
          content={themeOptions}
          buttonText={currentTheme}
          toggleHandler={themeHandler}
          type="Theme"
        ></DropDown>
        <LoggoutButton />
      </div>

      {/* <i
        className="fa fa-google network-element"
        aria-hidden="true"
        style={{ fontSize: "32px", color: "white" }}
      ></i>
      <i
        className="fa fa-facebook network-element"
        aria-hidden="true"
        style={{ fontSize: "32px" }}
      ></i>
      <i
        className="fa fa-instagram network-element"
        aria-hidden="true"
        style={{ fontSize: "32px" }}
      ></i> */}
    </header>
  );
};

export default Header;
