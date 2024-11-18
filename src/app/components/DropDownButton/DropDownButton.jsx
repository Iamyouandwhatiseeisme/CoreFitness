import React from "react";
import "./DropDownButton.css";
import CIcon from "@coreui/icons-react";

const DropDownButton = ({ children, open, toggle, type }) => {
  return (
    <div
      // className={
      //   open
      //     ? "border-solid border-2 border-blue-50 flex items-center w-fit p-0.5 min-w-12 bg-white rounded-lg cursor-pointer shadow-[0px_8px _24px_rgba(149,157,165,0.2)]"
      //     : "border-blue-50 flex items-center w-fit p-0.5 min-w-10 bg-white rounded-lg cursor-pointer shadow-[0px_8px _24px_rgba(149,157,165,0.2)]"
      // }
      className={
        open
          ? "flex items-center w-fit p-4 min-w-12 bg-white rounded-lg cursor-pointer border-2 border-solid border-blue-400 shadow-lg shadow-blue-400 "
          : "flex items-center w-fit p-4 min-w-12 bg-white rounded-lg cursor-pointer border-2 border-solid border-blue-50 shadow-sm shadow-blue-400"
      }
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
