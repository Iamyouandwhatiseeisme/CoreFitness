// "use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/global.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
// import { useEffect } from "react";
import { getDictionary } from "./dictionaries";

export const metadata = {
  title: "Core Fitness",
  description: "Your Fitness Friend",
};

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang);
  const dictHeader = dict.header;

  return (
    <html lang="en">
      <UserProvider>
        <body className="bg-neutral-200 dark:bg-neutral-900">
          <Header dict={dictHeader}></Header>
          {children}
          <Footer></Footer>
        </body>
      </UserProvider>
    </html>
  );
}
