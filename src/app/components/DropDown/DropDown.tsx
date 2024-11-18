"use client";
import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import { ThemeOption } from "../../hooks/useTheme";

const DropDown = (props: {
  buttonText: string[];
  content: ThemeOption[];
  toggleHandler: () => void;
  type: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  return (
    <div>
      <DropDownButton toggle={toggleDropDown} open={open} type={props.type}>
        {props.buttonText}
      </DropDownButton>
      <DropDownContent
        onSelect={toggleDropDown}
        open={open}
        toggleHandler={props.toggleHandler}
        type={props.type}
      >
        {props.content}
      </DropDownContent>
    </div>
  );
};

export default DropDown;
