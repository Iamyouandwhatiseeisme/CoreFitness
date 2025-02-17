"use client";
import React, { useEffect } from "react";

import InformationBoard from "../components/InformationBoard/InformationBoard";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import MobileBoard from "../components/MobileBoard/MobileBoard";
export interface HomePageCharityImageScreen {
  id: number;
  title: string;
  img: {
    img: string[];
  };
}

function Welcome() {
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const supabase = await createClient();

      const { data } = await supabase.auth.getUser();

      const { user } = data;
      if (!user) {
        router.push("/login");
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-white gap-4  flex flex-col  w-full   ">
      <div className="min-h-wrapper flex flex-col bg-gym-background bg-cover bg-fixed bg-center bg-no-repeat ">
        <div className=" bg-gradient-to-r from-slate-50/50 to-gray-300/50 dark:from-gray-900/40 dark:via-gray-800/80 dark:to-gray-700/70  min-h-screen">
          <InformationBoard />
          <MobileBoard></MobileBoard>
        </div>
      </div>
      <ChatWindow></ChatWindow>
    </div>
  );
}

export default Welcome;
