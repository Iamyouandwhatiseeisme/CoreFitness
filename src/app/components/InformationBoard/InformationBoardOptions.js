import React from "react";

export default function InformationBoardOptions({
  item,
  setHovered,
  isHovered,
  hoverColors,
}) {
  return (
    <div
      key={item.key}
      onMouseEnter={() => setHovered(item.key)}
      style={{
        backgroundColor: isHovered ? hoverColors[item.key] : "transparent",
        transition: "transform 0.15s ease-in-out",
        width: isHovered ? "550px" : "",
        transform: isHovered ? "scale(1.05)" : "scale(1.0)",
        height: isHovered ? "384px" : "",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={` rounded-3xl  hover:z-10 cursor-pointer`}
    >
      <div className="flex justify-start gap-10 m-8 flex-row h-14  ">
        <div className="w-16 flex flex-col justify-center">
          <img
            src={item.logo}
            className="rounded-full w-14  "
            alt="fitpass"
          ></img>
        </div>
        <div className="flex flex-col max-w-80">
          {item.titles.map((title) => (
            <div key={title}>{title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
