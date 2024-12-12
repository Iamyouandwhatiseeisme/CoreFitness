"use client";
import React, { useState } from "react";
import InformationBoardOptions from "./InformationBoardOptions";
import useInformationBoardItems from "../../hooks/useUnformationBoardItems";

export default function InformationBoard() {
  const [hovered, setHovered] = useState(0);
  const { informationBoardItems } = useInformationBoardItems();

  return (
    <div className="flex flex-row h-150 gap-20 justify-center mt-32 mb-5">
      <div className="hidden   flex-col rounded-2xl w-1/3 border border-header-hover-dark border-solid bg-black bg-opacity-85  xl:flex ">
        {informationBoardItems.map((item) => {
          const isHovered = hovered === item.key;
          return (
            <InformationBoardOptions
              item={item}
              key={item.key}
              setHovered={setHovered}
              isHovered={isHovered}
              hoverColor={item.hoverColor}
            ></InformationBoardOptions>
          );
        })}
      </div>

      {
        <div className="flex flex-col rounded-2xl w-1/3 border border-black border-solid bg-black bg-opacity-85 overflow-hidden cursor-pointer">
          <img
            className="flex flex-col rounded-2xl h-full border border-black border-solid bg-black bg-opacity-85 object-cover  transition-transform transform hover:scale-105"
            src={informationBoardItems[hovered].hoverImage}
            alt={informationBoardItems[hovered].titles[0]}
          ></img>
        </div>
      }
    </div>
  );
}
