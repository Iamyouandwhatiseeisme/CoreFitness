"use client";
import React from "react";
import { CIcon } from "@coreui/icons-react";

const DropDownItem = ({ children, onClick, toggleHandler, type }) => {
  const clickHandler = () => {
    onClick();
    if (type === "Sorter") {
      toggleHandler(children.option, children.order);
    }
    if (type === "Theme") {
      children.changeTheme();
      toggleHandler();
    }
  };

  return (
    <div
      className="p-2 m-0.5 w-full rounded-lg  cursor-pointer hover:bg-gray-200"
      onClick={() => {
        clickHandler();
      }}
    >
      {type === "Sorter" ? (
        children.label
      ) : (
        <CIcon icon={children.icon}></CIcon>
      )}
    </div>
  );
};

export default DropDownItem;
