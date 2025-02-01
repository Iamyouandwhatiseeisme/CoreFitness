"use client";
import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import { ThemeOption } from "../../hooks/useTheme";

interface DropDownProps {
  content: ThemeOption[];
}

const DropDown = (props: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="h-60 w-20 " onMouseLeave={() => setOpen(false)}>
      <DropDownButton toggle={toggleDropDown} open={open}></DropDownButton>
      <DropDownContent onSelect={toggleDropDown} open={open}>
        {props.content}
      </DropDownContent>
    </div>
  );
};

export default DropDown;
