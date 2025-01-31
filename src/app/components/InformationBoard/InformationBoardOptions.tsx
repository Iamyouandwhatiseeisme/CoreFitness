import React from "react";
import { InformationBoardItem } from "../types";

interface InformationBoardOptionsProps {
  item: InformationBoardItem;
  setHovered: (value: number) => void;
  isHovered: boolean;
  hoverColor: string;
}

export default function InformationBoardOptions(
  props: InformationBoardOptionsProps
) {
  return (
    <div
      key={props.item.key}
      onMouseEnter={() => props.setHovered(props.item.key)}
      style={{
        backgroundColor: props.isHovered ? props.hoverColor : "transparent",
        transition: "transform 0.15s ease-in-out",
        width: props.isHovered ? "480px" : "",
        transform: props.isHovered ? "scale(1.05)" : "scale(1.0)",
        height: props.isHovered ? "384px" : "",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={` rounded-3xl  hover:z-10 cursor-pointer`}
    >
      <div className="flex justify-start gap-10 m-8 flex-row h-14  ">
        <div className="w-16 flex flex-col justify-center">
          <img
            src={props.item.logo}
            className="rounded-full w-14  "
            alt="fitpass"
          ></img>
        </div>
        <div className="flex flex-col max-w-80">
          {props.item.titles.map((title) => (
            <div key={title}>{title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
