"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// import { redirect } from "next/dist/server/api-utils";
import "../styles/global.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }) {
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

  return (
    <html lang="en">
      <head>
        <script></script>
      </head>
      <UserProvider>
        <body className="bg-neutral-200 dark:bg-neutral-900">{children}</body>
      </UserProvider>
    </html>
  );
}
