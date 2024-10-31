"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme ? "dark" : "light");
      localStorage.setItem("system", true);
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const authenticated = !(accessToken === null || refreshToken === null);

    if (!authenticated) {
      redirect("/login");
    } else {
      setIsAuthenticated(authenticated);
    }
  }, [isAuthenticated]);
  return (
    <html lang="en">
      <head>
        <script></script>
      </head>
      <body className="bg-neutral-200 dark:bg-neutral-900">{children}</body>
    </html>
  );
}
