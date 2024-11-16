"use client";
import React from "react";

import InformationBoard from "../components/InformationBoard/InformationBoard";
import ChatWindow from "../components/ChatWindow/ChatWindow";

function Welcome() {
  return (
    <main className="max-w-full  m-0">
      <div className="bg-neutral-200 dark:bg-neutral-900 text-white">
        <ChatWindow></ChatWindow>
        <div className="min-h-wrapper flex flex-col bg-gym-background lg:bg-contain ">
          <InformationBoard></InformationBoard>
        </div>
      </div>
    </main>
  );
}

export default Welcome;

{
  /* <div className=" h-2/5 bg-green-200 bg-opacity-55 w-full m-5 rounded-3xl flex flex-col items-center justify-center p-5">
                    <h1 className="font-serif text-2xl font-semibold text-gray-300">
                      Personalised diet plan to reach your goals
                    </h1>
                  </div>
                  <div className="border border-solid border-gray-800 bg-opacity-30 w-full"></div>

                  <div className=" h-2/5 bg-purple-200 bg-opacity-55 w-full m-5 rounded-3xl flex flex-col items-center justify-center p-5">
                    <h1 className="font-serif text-2xl font-semibold text-gray-300">
                      Playlist maker for exercising based on your spotify
                      algorithm
                    </h1>
                  </div>
                  <div className="border border-solid border-gray-800 bg-opacity-30 w-full"></div>

                  <div className=" h-2/5 bg-emerald-950 bg-opacity-85 w-full m-5 rounded-3xl flex flex-col items-center justify-center p-5">
                    <h1 className="font-serif text-2xl font-semibold text-gray-300">
                      Google calendar arrangment assistance
                    </h1>
                  </div> */
}
