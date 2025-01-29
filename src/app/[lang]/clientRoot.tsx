"use client";
import React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "../components/providers/CartProvider";
import { LocaleProvider } from "../components/providers/LanguageContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Dictionary } from "./dictionaries";
import { User } from "@supabase/supabase-js";

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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent dark:border-r-transparent"></div>
      </div>
    );

  return (
    <>
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
            <div className="bg-neutral-200 dark:bg-neutral-900 font-serif">
              <Header currentUser={user} dict={dict.header} />
              {children}
              <Footer />
            </div>
          </CartProvider>
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}
