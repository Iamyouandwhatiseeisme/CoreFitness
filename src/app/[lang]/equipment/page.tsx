"use client";
import React, { useEffect, useState } from "react";

interface Equipment {
  id: number;
  img: {
    img: string;
  };
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  useEffect(() => {
    const fetchEquipment = fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error(error));
  }, []);
  const handleSelect = (item: Equipment) => {
    setSelectedEquipment(item);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <main className="h-auto flex flex-row items-center  from-white  bg-gradient-to-tr  to-black">
      <div className="h-full w-1/2 ">
        <div className="w-full h-90vh bg-white"></div>
        <div className="w-full  h-90vh bg-red-500"></div>
        <div className="w-full  h-90vh bg-white"></div>
        <div className="w-full  h-90vh bg-red-500"></div>
        <div className="w-full h-90vh bg-white"></div>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 border from-white  bg-gradient-to-r  to-black border-black shadow shadow-blue-500 rounded-2xl">
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
    </main>
  );
}
