import React from "react";
import DropDownItem from "../DropDownItem/DropDownItem";
import { ThemeOption } from "../../hooks/useTheme";

interface DropDownContentProps {
  children: ThemeOption[];
  open: boolean;
  onSelect: () => void;
}

const DropDownContent = (props: DropDownContentProps) => {
  return (
    <div
      style={{
        visibility: `${props.open ? "visible" : "hidden"}`,
        transition: "transform 150ms ease-in-out, opacity 150ms ease-in-out",
        transform: `${props.open ? "translateY(0)" : "translateY(-5%)"}`,
        overflow: "hidden",
      }}
      className={
        props.open
          ? "fixed rounded-lg animate-slide-in min-w-[48px] flex-col items-center mt-4 max-h-40vh z-50 flex cursor-pointer opacity-100 pointer-events-auto"
          : "absolute min-w-12 flex-col items-center mt-4 max-h-40vh pointer-events-none z-50 flex opacity-0"
      }
    >
      {
        <>
          {props.children.map((options) => (
            <DropDownItem onClick={props.onSelect} key={options.label}>
              {options}
            </DropDownItem>
          ))}
        </>
      }
    </div>
  );
};

export default DropDownContent;
