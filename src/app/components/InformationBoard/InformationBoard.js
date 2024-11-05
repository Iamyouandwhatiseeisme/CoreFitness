"use client";
import React, { useState } from "react";

export default function InformationBoard() {
  const [hovered, setHovered] = useState("0");

  const informationBoardItems = [
    {
      key: 0,
      logo: "/images/Fitpass.png",
      titles: [
        "Access to every facility with Fitpass",
        "In case of using a facility free parking for up to 2 hours",
      ],
      hoverColor: "bg-yellow-400",
      hoverImage: "/images/Fitpass Image.png",
    },
    {
      key: 1,
      logo: "/images/Equipment Logo.jpg",
      titles: [
        "Modern equipment covering every aspect of desired workout",
        "Electronic system for queuing for workout in case of big traffic",
      ],
      hoverColor: "bg-green-400 ",
      hoverImage: "/images/Equipment Image.jpeg",
    },
    {
      key: 2,
      logo: "/images/Healthy Logo.jpg",
      titles: [
        "Healthy snacks and protein shakes",
        "Kitchen with high-protein and healthy food",
      ],
      hoverColor: "bg-purple-400 ",
      hoverImage: "/images/Cafe Image.jpg",
    },
    {
      key: 3,
      logo: "/images/Professional Logo.avif",
      titles: ["Certified trainers for workout", "Pilates and yoga circles"],
      hoverColor: "bg-teal-400 ",
      hoverImage: "/images/Trainer Image.jpg",
    },
    {
      key: 4,
      logo: "/images/Branches Logo.jpg",
      titles: [
        "Branches on each side of the city</div>",
        "Subscription system for every branch",
      ],
      hoverColor: "bg-blue-400 ",
      hoverImage: "/images/Branches Image.png",
    },
  ];

  return (
    <div className="flex flex-row h-90vh gap-20 justify-center mt-5">
      <div className="hidden  flex-col rounded-2xl w-1/3 border border-header-hover-dark border-solid bg-black bg-opacity-85  xl:flex ">
        {informationBoardItems.map((item) => {
          return (
            <div
              key={item.key}
              onMouseEnter={() => setHovered(item.key)}
              className={`hover:${item.hoverColor} hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96  transition-transform transform hover:scale-105 cursor-pointer`}
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
                    <div key={item}>{title}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {
        <div className="flex flex-col rounded-2xl w-1/3 border border-black border-solid bg-black bg-opacity-85 overflow-hidden">
          <img
            className="flex flex-col rounded-2xl h-full border border-black border-solid bg-black bg-opacity-85 object-cover  transition-transform transform hover:scale-105"
            src={informationBoardItems[hovered].hoverImage}
            alt={informationBoardItems[hovered].title}
          ></img>
        </div>
      }

      {/* <div className="hidden  flex-col rounded-2xl w-1/3 border border-header-hover-dark border-solid bg-black bg-opacity-85  xl:flex ">
        <div className="hover:bg-yellow-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96  transition-transform transform hover:scale-105 cursor-pointer ">
          <div className="flex justify-start gap-10 m-8 flex-row h-14  ">
            <div className="w-16 flex flex-col justify-center">
              <img
                src="/images/Fitpass.png"
                className="rounded-full w-10"
                alt="fitpass"
              ></img>
            </div>
            <div className="flex flex-col">
              <div>Access to every facility with Fitpass</div>
              <div>
                In case of using a facility free parking for up to 2 hours
              </div>
            </div>
          </div>
        </div>
        <div className="mr-5 ml-5 border border-header-hover-dark border-opacity-55"></div>
        <div className="hover:bg-green-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer transition-transform transform hover:scale-105 ">
          <div className="flex justify-start gap-10 m-8 flex-row h-14">
            <div className="w-16 flex flex-col justify-center">
              Modern Equipment
            </div>
            <div className="flex flex-col">
              <div>
                Modern equipment covering every aspect of desired workout
              </div>
              <div>
                Electronic system for queuing for workout in case of big traffic
              </div>
            </div>
          </div>
        </div>
        <div className="mr-5 ml-5 mt-2 border border-header-hover-dark border-opacity-55"></div>
        <div className="hover:bg-purple-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer  transition-transform transform hover:scale-105 ">
          <div className="flex justify-start gap-10 m-8 flex-row h-14">
            <div className="w-16 flex flex-col justify-center">
              Healthy Cafe
            </div>
            <div className="flex flex-col">
              <div>Healthy snacks and protein shakes</div>
              <div>Kitchen with high-protein and healthy food</div>
            </div>
          </div>
        </div>
        <div className="mr-5 ml-5 mt-2 border border-header-hover-dark border-opacity-55"></div>
        <div className="hover:bg-slate-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer transition-transform transform hover:scale-105 ">
          <div className="flex justify-start gap-10 m-8 flex-row h-14">
            <div className="w-16 flex flex-col justify-center">
              Certified Trainers
            </div>
            <div className="flex flex-col">
              <div>Certified trainers for workout</div>
              <div>Pilates and yoga circles</div>
            </div>
          </div>
        </div>
        <div className="mr-5 ml-5 mt-2 border border-header-hover-dark border-opacity-55"></div>
        <div className="hover:bg-teal-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer transition-transform transform hover:scale-105 ">
          <div className="flex justify-start gap-10 m-8 flex-row h-14">
            <div className="w-16 flex flex-col justify-center">Branches</div>
            <div className="flex flex-col">
              <div>Branches on each side of the city</div>
              <div>Subscription system for every branch</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-2xl w-1/2 border border-black border-solid bg-black bg-opacity-85"></div> */}
    </div>
  );
}
