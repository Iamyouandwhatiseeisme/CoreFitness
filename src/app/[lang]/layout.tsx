import "../styles/global.css";
import { getDictionary } from "./dictionaries";
import { createClient } from "../utils/supabase/server";
import React from "react";
import ClientRoot from "./clientRoot";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(231);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ClientRoot lang={props.params.lang} dict={dict} user={user}>
          {props.children}
        </ClientRoot>
      </body>
    </html>
  );
}
