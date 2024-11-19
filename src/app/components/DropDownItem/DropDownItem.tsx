"use client";
import React from "react";
import { CIcon } from "@coreui/icons-react";
import { ThemeOption } from "../../hooks/useTheme";
import { SortOption } from "../types";

interface DropDownItemProps {
  children: ThemeOption | SortOption;
  onClick: () => void;
  toggleHandler: (
    option: string | undefined,
    order: string | undefined
  ) => void;
  type: string;
}

const DropDownItem = (props: DropDownItemProps) => {
  const clickHandler = () => {
    props.onClick();
    if (props.type === "Sorter") {
      var sortItem = props.children as SortOption;
      props.toggleHandler(sortItem.option, sortItem.order);
    }
    if (props.type === "Theme") {
      var themeItem = props.children as ThemeOption;
      themeItem.changeTheme();
      props.toggleHandler(undefined, undefined);
    }
  };

  return (
    <div
      className="p-2 m-0.5 w-full rounded-lg  cursor-pointer hover:bg-gray-200"
      onClick={() => {
        clickHandler();
      }}
    >
      {props.type === "Sorter" ? (
        (props.children as SortOption).label
      ) : (
        <CIcon icon={(props.children as ThemeOption).icon}></CIcon>
      )}
    </div>
  );
};

export default DropDownItem;
