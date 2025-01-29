import React from "react";
import CIcon from "@coreui/icons-react";
import { useTheme } from "next-themes";
import { cilMoon, cilScreenDesktop, cilSun } from "@coreui/icons";

interface DropDownButtonProps {
  open: boolean;
  toggle: () => void;
}

const DropDownButton = (props: DropDownButtonProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={
        props.open
          ? "flex items-center w-fit p-4 min-w-12 rounded-lg cursor-pointer border-2 border-solid border-blue-400 shadow-lg shadow-blue-400 dark:shadow-yellow-400"
          : "flex items-center w-fit p-4 min-w-12 rounded-lg cursor-pointer border-2 border-solid border-blue-50 shadow-sm shadow-blue-400 dark:shadow-yellow-400"
      }
      onClick={props.toggle}
    >
      <CIcon
        icon={
          theme === "system"
            ? cilScreenDesktop
            : theme === "light"
            ? cilSun
            : cilMoon
        }
      ></CIcon>
    </div>
  );
};

export default DropDownButton;
