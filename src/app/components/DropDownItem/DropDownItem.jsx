"use client";
import React from "react";
import "./DropDownItem.css";
import { click } from "@testing-library/user-event/dist/click";

const DropDownItem = ({ children, onClick, toggleHandler, type }) => {
  const handleSortOption = () => {
    onClick();
  };
  const clickHandler = () => {
    if (type === "Sorter") {
      toggleHandler(children.option, children.order);
    }
    if (type === "Theme") {
      console.log(children.label);
    }
  };

  return (
    <div
      className="dropdown-item"
      onClick={() => {
        handleSortOption();
        clickHandler();
      }}
    >
      {children.label}
    </div>
  );
};

export default DropDownItem;
