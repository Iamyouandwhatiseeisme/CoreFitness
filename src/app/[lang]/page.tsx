"use client";
import React, { useEffect, useState } from "react";

import InformationBoard from "../components/InformationBoard/InformationBoard";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { GridLoader } from "react-spinners";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
export interface HomePageCharityImageScreen {
  id: number;
  title: string;
  img: {
    img: string[];
  };
}

function Welcome() {
  const [homePageCharity, setHomePageCharity] = useState<
    HomePageCharityImageScreen[]
  >([]);
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

  useEffect(() => {
    fetch("/api/homePageCharity")
      .then((res) => res.json())
      .then((data) => setHomePageCharity(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="max-w-full  m-0 ">
      <div className="bg-neutral-200 dark:bg-neutral-900 text-white ">
        <div className="min-h-wrapper flex flex-col bg-gym-background lg:bg-contain ">
          <InformationBoard></InformationBoard>
        </div>
        <ChatWindow></ChatWindow>
        <div
          id="info-charity"
          className="min-h-wrapper flex flex-col items-center justify-center bg-disabled    "
        >
          {homePageCharity.length !== 0 ? (
            <div className="w-full h-full flex flex-row justify-center ">
              <div className="grid grid-cols-2 gap-4 w-96 h-96 border border-gray-300 rounded-2xl m-5 p-2 bg-gradient-to-tr from-blue-100 to-blue-400">
                {homePageCharity[0].img.img.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-center items-center rounded-2xl"
                    >
                      <img
                        src={item}
                        alt={item}
                        className="w-full h-full object-cover rounded-2xl"
                      ></img>
                    </div>
                  );
                })}
              </div>
              <div className="w-96 h-96 border border-gray-300 m-5 p-2 bg"></div>
            </div>
          ) : (
            <GridLoader></GridLoader>
          )}
        </div>
      </div>
    </main>
  );
}

export default Welcome;
