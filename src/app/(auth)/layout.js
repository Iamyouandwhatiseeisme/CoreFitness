"use client";
import { useEffect, useState } from "react";
import "../../app/styles/global.css";
import { redirect } from "next/navigation";
import "../styles/global.css";
// export const metadata = {
//   title: "Medical Mushroom Market app",
//   description: "Web site created with Next.js.",
// };

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" || (!("theme" in localStorage) && theme)
    );
    console.log(localStorage.getItem("system"));
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
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">{children}</div>
    </body>
  );
}
