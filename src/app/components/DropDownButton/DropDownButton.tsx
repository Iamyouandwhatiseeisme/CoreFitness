import React from "react";
import CIcon from "@coreui/icons-react";

interface DropDownButtonProps {
  children: string[];
  open: boolean;
  toggle: () => void;
  type: string;
}

const DropDownButton = (props: DropDownButtonProps) => {
  return (
    <div
      className={
        props.open
          ? "flex items-center w-fit p-4 min-w-12 rounded-lg cursor-pointer border-2 border-solid border-blue-400 shadow-lg shadow-blue-400 dark:shadow-yellow-400"
          : "flex items-center w-fit p-4 min-w-12 rounded-lg cursor-pointer border-2 border-solid border-blue-50 shadow-sm shadow-blue-400 dark:shadow-yellow-400"
      }
      onClick={props.toggle}
    >
      {props.type === "Theme" ? (
        <CIcon icon={props.children}></CIcon>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
};

export default DropDownButton;
