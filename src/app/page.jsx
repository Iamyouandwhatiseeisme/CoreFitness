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
          <div className="min-h-wrapper flex flex-col bg-gemini animate-pulse relative"></div>
          <div className="flex flex-col gap-5 items-center mt-5 text-white z-10 absolute top-28  w-full">
            <div className="w-1/4 bg-slate-400 bg-opacity-55 rounded-2xl">
              dsd
            </div>
            <div className="w-1/4 h-60vh bg-slate-400 bg-opacity-55 rounded-2xl">
              dsd
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
