import React from "react";
import "./DropDownButton.css";
import CIcon from "@coreui/icons-react";

const DropDownButton = ({ children, open, toggle, type }) => {
  return (
    <div
      className={open ? "button-open dropdown-btn" : "dropdown-btn"}
      onClick={toggle}
    >
      {type === "Theme" ? (
        <CIcon icon={children}></CIcon>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default DropDownButton;
