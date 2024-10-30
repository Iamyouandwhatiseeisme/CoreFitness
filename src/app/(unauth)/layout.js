"use client";
import { useEffect, useState } from "react";
import "../../app/styles/global.css";
import { redirect } from "next/navigation";
// export const metadata = {
//   title: "Medical Mushroom Market app",
//   description: "Web site created with Next.js.",
// };
export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const authenticated = !(accessToken === null || refreshToken === null);

    if (!authenticated) {
      return;
    } else {
      setIsAuthenticated(authenticated);
      redirect("/");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" || (!("theme" in localStorage) && theme)
    );
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme ? "dark" : "light");
      localStorage.setItem("system", true);
    }
  }, []);

  return (
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">{children}</div>
    </body>
  );
}
