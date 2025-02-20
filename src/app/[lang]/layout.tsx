import "../styles/global.css";
import { getDictionary } from "./dictionaries";
import { createClient } from "../utils/supabase/server";
import React from "react";
import ClientRoot from "./clientRoot";
import { Inter, Oswald } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });

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

  console.log(process.env.NEXT_PUBLIC_VERCEL_ENV, process.env.VERCEL_URL);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} ${oswald.className}`}>
        <ClientRoot lang={props.params.lang} dict={dict} user={user}>
          {props.children}
        </ClientRoot>
      </body>
    </html>
  );
}
