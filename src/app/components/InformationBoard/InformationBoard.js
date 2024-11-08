"use client";
import React, { useState } from "react";
// import { informationBoardItems } from "../data/InformationBoardItems";
import { useLocale } from "../providers/LanguageContext";

export default function InformationBoard() {
  const [hovered, setHovered] = useState(0);
  const { informationBoard } = useLocale();
  const hoverColors = [
    "#FBBF24",
    "#60A5FA ",
    "#A78BFA",
    "#2DD4BF ",
    "#4ADE80 ",
  ];

  const informationBoardItems = [
    {
      key: 0,
      logo: "/images/Fitpass.png",
      titles: [
        informationBoard.AccessToEveryFacility,
        informationBoard.InCaesOfUsingFacility,
      ],
      hoverColor: "bg-yellow-400",
      hoverImage: "/images/Fitpass Image.png",
    },
    {
      key: 1,
      logo: "/images/Equipment Logo.jpg",
      titles: [
        informationBoard.ModernEquipment,
        informationBoard.ElectronicSystem,
      ],
      hoverColor: "bg-blue-400 ",
      hoverImage: "/images/Equipment Image.jpeg",
    },
    {
      key: 2,
      logo: "/images/Healthy Logo.jpg",
      titles: [informationBoard.HealthySnacks, informationBoard.Kitchen],
      hoverColor: "bg-purple-400 ",
      hoverImage: "/images/Cafe Image.jpg",
    },
    {
      key: 3,
      logo: "/images/Professional Logo.avif",
      titles: [
        informationBoard.CertifiedTrainers,
        informationBoard.PilatesAndYoga,
      ],
      hoverColor: "bg-teal-400 ",
      hoverImage: "/images/Trainer Image.jpg",
    },
    {
      key: 4,
      logo: "/images/Branches Logo.jpg",
      titles: [
        informationBoard.BranchesOnEachSide,
        informationBoard.SubscriptionSystemForEvery,
      ],
      hoverColor: "bg-green-400 ",
      hoverImage: "/images/Branches Image.png",
    },
  ];

  return (
    <div className="flex flex-row h-90vh gap-20 justify-center mt-5 mb-5">
      <div className="hidden  flex-col rounded-2xl w-1/3 border border-header-hover-dark border-solid bg-black bg-opacity-85  xl:flex ">
        {informationBoardItems.map((item) => {
          const isHovered = hovered === item.key;
          return (
            <div
              key={item.key}
              onMouseEnter={() => setHovered(item.key)}
              style={{
                backgroundColor: isHovered
                  ? hoverColors[item.key]
                  : "transparent",
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
        })}
      </div>

      {
        <div className="flex flex-col rounded-2xl w-1/3 border border-black border-solid bg-black bg-opacity-85 overflow-hidden cursor-pointer">
          <img
            className="flex flex-col rounded-2xl h-full border border-black border-solid bg-black bg-opacity-85 object-cover  transition-transform transform hover:scale-105"
            src={informationBoardItems[hovered].hoverImage}
            alt={informationBoardItems[hovered].title}
          ></img>
        </div>
      }
    </div>
  );
}
