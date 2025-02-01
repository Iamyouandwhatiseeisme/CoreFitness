"use client";
import React from "react";
import { CIcon } from "@coreui/icons-react";
import { ThemeOption } from "../../hooks/useTheme";
import { SortOption } from "../types";
import { useTheme } from "next-themes";

interface DropDownItemProps {
  children: ThemeOption | SortOption;
  onClick: () => void;
  // toggleHandler: (
  //   option: string | undefined,
  //   order: string | undefined
  // ) => void;
}

const DropDownItem = (props: DropDownItemProps) => {
  const { setTheme } = useTheme();

  const clickHandler = () => {
    props.onClick();

    setTheme(props.children.label);
  };

  return (
    <div
      className="p-2 m-0.5 w-[48px] rounded-lg  cursor-pointer border-[#5A5B5C]  shadow-sm shadow-blue-400/20 dark:border dark:border-white/20 dark:hover:bg-[#4E4F50] hover:bg-white/40 hover:scale-105 transition-all duration-300"
      onClick={() => {
        clickHandler();
      }}
    >
      <CIcon icon={(props.children as ThemeOption).icon}></CIcon>
    </div>
  );
};

export default DropDownItem;
