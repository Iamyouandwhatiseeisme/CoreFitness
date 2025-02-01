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
          ? "flex items-center w-[48px] p-4  rounded-lg cursor-pointer border-2 border-dotted bg-white/20 border-[#5A5B5C] hover:border  hover:border-blue-200 shadow-sm shadow-blue-400/20 dark:shadow-yellow-400/20 dark:hover:bg-[#4E4F50]  hover:bg-white/40 hover:scale-105 transition-all duration-300"
          : "flex items-center w-[48px] p-4  rounded-lg cursor-pointer border-2 border-dashed bg-white/20 border-[#5A5B5C] hover:border  hover:border-blue-200 shadow-sm shadow-blue-400/20 dark:shadow-yellow-400/20 dark:hover:bg-[#4E4F50] hover:bg-white/40 hover:scale-105 transition-all duration-300"
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
