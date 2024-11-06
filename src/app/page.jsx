import React from "react";
// import Header from "../../components/header/Header.js";
// import Footer from "../../components/footer/Footer.js";
// import Content from "../../components/Content.js";

// import { CIcon } from "@coreui/icons-react";
// import { cilFingerprint } from "@coreui/icons";
// import "./index.css";
import InformationBoard from "./components/InformationBoard/InformationBoard";

function Welcome() {
  return (
    <main className="max-w-full overflow-x-hidden m-0">
      <div className="bg-neutral-200 dark:bg-neutral-900 text-white">
        <div>
          <div className="min-h-wrapper flex flex-col bg-gemini ">
            <div className="flex flex-row h-90vh gap-3 justify-center mt-5 mb-5">
              <div className="flex flex-col gap-2 items-center mt-5 m-5 text-white  w-1/2">
                <h1 className="font-serif text-3xl font-bold text-gray-300">
                  Try our AI assistant for your healthy life
                </h1>
                <div className="flex flex-col w-full h-60vh bg-gray-800 bg-opacity-75 rounded-2xl items-center border border-b-gray-500">
                  <div className=" h-2/5 bg-black bg-opacity-55 w-full m-5 rounded-3xl flex flex-col items-center justify-center p-5">
                    <h1 className="font-serif text-2xl font-semibold text-gray-300">
                      Personalised diet plan to reach your goals
                    </h1>
                  </div>
                  <div className="border border-solid border-gray-800 bg-opacity-30 w-full"></div>

                  <div className=" h-2/5 bg-black bg-opacity-55 w-full m-5 rounded-3xl flex flex-col items-center justify-center p-5">
                    <h1 className="font-serif text-2xl font-semibold text-gray-300">
                      Playlist maker for exercising based on your spotify
                      algorithm
                    </h1>
                  </div>
                  <div className="border border-solid border-gray-800 bg-opacity-30 w-full"></div>

                  <div className=" h-2/5 bg-black bg-opacity-55 w-full m-5 rounded-3xl flex flex-col items-center justify-center p-5">
                    <h1 className="font-serif text-2xl font-semibold text-gray-300">
                      Google calendar arrangment assistance
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 items-start mt-5 text-white mr-4  w-1/2">
                <div className="w-full bg-gray-800 bg-opacity-75 rounded-2xl">
                  dsd
                </div>
                <div className="w-full h-60vh bg-gray-800 bg-opacity-55 rounded-2xl">
                  dsd
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-wrapper flex flex-col bg-gym-background lg:bg-contain">
          <InformationBoard></InformationBoard>
        </div>
      </div>
    </main>
  );
}

export default Welcome;
