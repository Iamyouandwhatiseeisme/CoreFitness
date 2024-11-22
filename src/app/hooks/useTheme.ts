import { cilSun, cilMoon, cilScreenDesktop, cilSync } from "@coreui/icons";
import { useEffect, useState } from "react";

export interface ThemeOption {
  label: string;
  icon: string[];
  changeTheme: () => void;
}

export default function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(cilSync);

  const themeOptions: ThemeOption[] = [
    {
      label: "light",
      icon: cilSun,
      changeTheme: () => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("system", "false");
        setCurrentTheme(cilSun);
      },
    },
    {
      label: "dark",
      icon: cilMoon,
      changeTheme: () => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("system", "false");

        setCurrentTheme(cilMoon);
      },
    },
    {
      label: "system",
      icon: cilScreenDesktop,
      changeTheme: () => {
        localStorage.setItem("system", "true");
        localStorage.removeItem("theme");

        setCurrentTheme(cilScreenDesktop);
      },
    },
  ];
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
  }, [currentTheme]);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme ? "dark" : "light");
      localStorage.setItem("system", "true");
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);
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
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    themeQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      themeQuery.removeEventListener("change", handleSystemThemeChange);
  }, [currentTheme]);
  return { currentTheme, themeOptions, themeHandler };
}
