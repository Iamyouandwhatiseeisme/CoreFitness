import React from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import Content from "../../components/Content.js";
import "./index.css";

function Welcome() {
  return (
    <div>
      <Header />
      <div className="wrapper"></div>
      <Footer />
    </div>
  );
}

export default Welcome;
