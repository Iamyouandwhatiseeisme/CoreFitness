import React, { useState } from "react";

export default function LoginPageBoard() {
  const [isHovered, setIsHoverd] = useState(false);
  console.log(isHovered);
  return (
    <div
      className="bg-gym-background w-1/2 z-10 relative transition-all duration-400 hover:w-60wv group hidden lg:flex "
      onMouseEnter={() => {
        setIsHoverd(true);
      }}
      onMouseLeave={() => {
        setIsHoverd(false);
      }}
    >
      <div className=" bg-black inset-0 z-40 absolute bg-opacity-80">
        <div className="absolute shadow-inner w-96 hover:scale-105 cursor-pointer shadow-white z-50 top-1/4 left-1/4 border gap-4 border-black  h-1/4 rounded-2xl bg-teal-300 flex flex-col justify-center items-center">
          <img
            src="/images/Equipment Logo.jpg"
            alt="logo"
            className="rounded-md w-20 shadow-sm shadow-white"
          ></img>
          <div className="border border-black bg-black bg-opacity-80 rounded-md pr-4 pl-4 flex flex-col  shadow-black shadow-sm items-center">
            <h1 className=" z-40 text-white font-serif text-2xl">
              Welcome to Core Fitness
            </h1>
          </div>
        </div>
        <div>
          <div
            className={`absolute transition-all duration-1500 ease-in-out transform 
      shadow-inner cursor-pointer shadow-white z-50 top-1/2 left-1/4 border gap-4
      border-black w-1/2 h-1/4 rounded-2xl bg-green-400 flex flex-col justify-center items-center
      opacity-0 -translate-y-full group-hover:opacity-100 group-hover:translate-y-2`}
          >
            <div className="borde  rounded-md pr-4 pl-4 flex flex-col  items-center justify-center text-center">
              <h1
                className={` z-40  font-serif text-2xl font-extrabold   ${
                  isHovered ? "flex" : "hidden"
                } `}
              >
                Please consult your physician before using weights for work out
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
