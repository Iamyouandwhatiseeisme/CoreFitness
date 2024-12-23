import "../styles/global.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { getDictionary } from "./dictionaries";
import { LocaleProvider } from "../components/providers/LanguageContext";
import { createClient } from "../utils/supabase/server";
import React from "react";
import { CartProvider } from "../components/providers/CartProvider";

export const metadata = {
  title: "Core Fitness",
  description: "Your Fitness Friend",
};

interface LayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function RootLayout(props: LayoutProps) {
  const dict = await getDictionary(props.params.lang);
  const supabase = await createClient();

  const dictHeader = dict.header;
  const dictChat = dict.chatWindow;
  const informationBoard = dict.informationBoard;
  const { data } = await supabase.auth.getUser();

  const { user } = data;

  return (
    <html lang="en">
      <LocaleProvider
        lang={props.params.lang}
        dictChat={dictChat}
        informationBoard={informationBoard}
      >
        <CartProvider>
          <body className="bg-neutral-200 dark:bg-neutral-900 font-serif">
            <Header currentUser={user} dict={dictHeader}></Header>
            {props.children}
            <Footer></Footer>
          </body>
        </CartProvider>
      </LocaleProvider>
    </html>
  );
}
