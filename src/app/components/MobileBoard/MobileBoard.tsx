import React from "react";
import useInformationBoardItems from "src/app/hooks/useUnformationBoardItems";

export default function MobileBoard() {
  const { informationBoardItems } = useInformationBoardItems();

  return (
    <div className="flex xl:hidden flex-col z-50 mt-20 justify-start items-center w-3/4 m-auto  p-4 bg-black/40 rounded-lg shadow-lg">
      {informationBoardItems.map((item) => {
        return (
          <div
            key={item.key}
            className="border flex w-full flex-col border-gray-600 bg-gray-800 text-white p-2 m-2 rounded-md shadow-md"
          >
            {item.titles[0]}
            <div>{item.titles[1]}</div>
          </div>
        );
      })}
    </div>
  );
}
