"use client";
import React from "react";
import { useEffect, useState } from "react";
import { CartProvider } from "../components/providers/CartProvider";
import { LocaleProvider } from "../components/providers/LanguageContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Dictionary } from "./dictionaries";
import { User } from "@supabase/supabase-js";
import { ThemeProvider } from "../hooks/themeProvider";
import RightSidePanel from "../components/RightSidePanel/RightSidePanel";

export default function ClientRoot({
  children,
  lang,
  dict,
  user,
}: {
  children: React.ReactNode;
  lang: string;
  dict: Dictionary;
  user: User | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-200 dark:bg-neutral-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
      </div>
    );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LocaleProvider
        lang={lang}
        dictChat={dict.chatWindow}
        informationBoard={dict.informationBoard}
      >
        <CartProvider>
          <div className="bg-gradient-to-br  from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800   flex flex-row justify-between">
            <Header currentUser={user} dict={dict.header} />
            <main
              className={`${
                user === null
                  ? ""
                  : `flex flex-col items-center justify-start m-auto 
                bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg
                rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/30
                border border-white/20 dark:border-slate-800
                transition-all duration-300 ease-out
                max-w-[calc(100%-100  px)] w-full
                 space-y-8
                hover:shadow-3xl hover:shadow-slate-400/40 dark:hover:shadow-slate-950/50`
              }
                `}
            >
              {" "}
              {children}
              <Footer />
            </main>
            <RightSidePanel
              currentUser={user}
              dict={dict.header}
            ></RightSidePanel>
          </div>
        </CartProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
