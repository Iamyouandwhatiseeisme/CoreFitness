"use client";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

interface Equipment {
  id: number;
  img: {
    img: string;
  };
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
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchEquipment = fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error(error));
    const fetchMuscles = fetch("/api/muscles")
      .then((res) => res.json())
      .then((data) => setMuscles(data))
      .catch((error) => console.error(error));
    setIsLoading(false);
  }, []);
  const handleSelect = (item: Equipment) => {
    setSelectedEquipment(item);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <main
      className={`h-auto flex flex-row ${
        isLoading ? "items-center justify-center" : "items-start "
      } from-white  bg-gradient-to-tr  to-black`}
    >
      {isLoading ? (
        <div className="flex flex-row items-center justify-center h-100vh">
          <GridLoader></GridLoader>
        </div>
      ) : (
        <div className="h-full w-full flex flex-row items-start">
          <div className="h-full w-1/2 ">
            {muscles.map((muscle) => {
              const isYellow = Number(muscle.id) % 2 === 0;
              return (
                <div
                  className={`w-full h-100vh ${
                    isYellow ? "bg-yellow-400" : "bg-white"
                  } border-b flex flex-col items-center justify-center`}
                >
                  <div className="w-full  h-150 flex flex-col items-center justify-center">
                    <img
                      className="w-full h-150 object-fill"
                      src={muscle.img.img}
                      alt={`${muscle.id}`}
                    ></img>
                  </div>
                </div>
              );
            })}
            {/* <div className="w-full h-100vh bg-white"></div>
        <div className="w-full  h-100vh bg-yellow-500"></div>
        <div className="w-full  h-100vh bg-white"></div>
        <div className="w-full  h-100vh bg-yellow-500"></div>
        <div className="w-full h-100vh bg-white"></div> */}
          </div>
          <div className="flex-col items-start justify-start">
            <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 border-black shadow shadow-blue-500">
              {equipment.map((item) => (
                <div
                  key={item.id}
                  className="w-90 h-72 m-5 flex flex-col p-10 from-white to-gray-200 bg-gradient-to-r items-center justify-center rounded-2xl"
                  onClick={() => handleSelect(item)}
                >
                  <img
                    className="object-cover rounded-2xl w-full h-full"
                    src={item.img.img}
                    alt={`Equipment ${item.id}`}
                  />
                </div>
              ))}
            </div>
            {selectedEquipment && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
                onClick={closeModal}
              >
                <div
                  className="relative bg-white p-4 rounded-lg max-w-4xl w-full h-90vh items-center flex flex-col justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <img
                    className="w-1/2"
                    src={selectedEquipment.img.img}
                    alt={`Full view of Equipment ${selectedEquipment.id}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
