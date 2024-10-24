import React from "react";
import Gear from "../../../public/images/Gear.gif";
import "../styles/global.css";

export default function loading() {
  return (
    <div className="loading-spinner">
      <img src={Gear.src} alt="loading"></img>
    </div>
  );
}
