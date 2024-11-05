import React from "react";
// import Header from "../../components/header/Header.js";
// import Footer from "../../components/footer/Footer.js";
// import Content from "../../components/Content.js";

// import { CIcon } from "@coreui/icons-react";
// import { cilFingerprint } from "@coreui/icons";
import "./index.css";
import InformationBoard from "./components/InformationBoard/InformationBoard";

function Welcome() {
  return (
    <main>
      <div className="bg-neutral-200 dark:bg-neutral-900 text-white">
        <div className="min-h-wrapper flex flex-col bg-gym-background bg-contain">
          <InformationBoard></InformationBoard>
        </div>
      </div>
    </main>
  );
}

export default Welcome;
