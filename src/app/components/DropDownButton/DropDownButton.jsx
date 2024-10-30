import React from "react";
import "./DropDownButton.css";
import CIcon from "@coreui/icons-react";
import { cilSun, cilMoon, cilScreenDesktop } from "@coreui/icons";

const DropDownButton = ({ children, open, toggle, type }) => {
  return (
    <div
      // className={open ? "button-open dropdown-btn" : "dropdown-btn"}
      className="dropdown-btn"
      onClick={toggle}
    >
      {type === "Theme" ? <CIcon icon={cilSun}></CIcon> : <div>{children}</div>}
    </div>
  );
};

export default DropDownButton;
