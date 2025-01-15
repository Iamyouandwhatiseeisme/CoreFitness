"use client";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

interface Equipment {
  id: number;
  img: {
    img: string;
  };
  title: string;
  description: string;
}
interface Muscles {
  id: number;
  img: {
    img: string;
  };
  title: string;
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [muscles, setMuscles] = useState<Muscles[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error(error));
    fetch("/api/muscles")
      .then((res) => res.json())
      .then((data) => setMuscles(data))
      .catch((error) => console.error(error));
    setIsLoading(false);
  }, []);

  return (
    <main
      className={`h-auto flex flex-row items-center justify-center from-white  bg-gradient-to-tr  to-black`}
    >
      {isLoading ? (
        <div className="flex flex-row items-center justify-center h-100vh">
          {/* <GridLoader></GridLoader> */}
        </div>
      ) : (
        <div className="flex flex-col gap-10 w-full m-10">
          {equipment.map((item) => {
            return (
              <div className="w-full  h-120  bg-white flex flex-row items-start justify-between border border-gray-500 rounded-2xl">
                <img
                  className="w-1/2 bg-white h-full rounded-tl-2xl rounded-bl-2xl rounded-br-3xl border border-gray-200 object-contain
                  "
                  src={item.img.img}
                  alt={`${item.id}`}
                ></img>
                <div className="w-full  flex flex-col items-center mt-10 border-b-2 border-gray-200">
                  <h1 className="font-bold text-2xl underline  border-b-2 border-gray-200">
                    {item.title}
                  </h1>
                  <p className="m-10 text-lg">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
