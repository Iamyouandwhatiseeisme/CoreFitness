// "use client";
import "../styles/global.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { getDictionary } from "./dictionaries";
import { LocaleProvider } from "../components/providers/LanguageContext";
import { createClient } from "../utils/supabase/server";
import { UserProvider } from "../components/providers/UserProvider";

export const metadata = {
  title: "Core Fitness",
  description: "Your Fitness Friend",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(props.params.lang);
  const supabase = await createClient();

  const dictHeader = dict.header;
  const dictChat = dict.chatWindow;
  const informationBoard = dict.informationBoard;
  const { data } = await supabase.auth.getUser();

  const { user } = data;

  return (
    <html lang="en">
      <UserProvider initialUser={user}>
        <LocaleProvider
          lang={props.params.lang}
          dictChat={dictChat}
          informationBoard={informationBoard}
        >
          <body className="bg-neutral-200 dark:bg-neutral-900">
            <Header user={user} dict={dictHeader}></Header>
            {props.children}
            <Footer></Footer>
          </body>
        </LocaleProvider>
      </UserProvider>
    </html>
  );
}
