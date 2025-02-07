"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "src/app/components/providers/LanguageContext";

interface Equipment {
  id: number;
  img: {
    img: string;
  };
  title: string;
  description: string;
  description_ka: string;
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const { locale } = useLocale();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error(error));

    setIsLoading(false);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tl from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 w-full p-4 md:p-10">
          {equipment.map((item) => {
            const description =
              locale === "ka" ? item.description_ka : item.description;
            return (
              <div
                key={item.id}
                className="w-full h-auto bg-white flex flex-col md:flex-row items-start justify-between border border-gray-500 rounded-2xl"
              >
                <img
                  className="w-full md:w-1/2 bg-white h-64 md:h-full rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl rounded-br-3xl border border-gray-200 object-contain"
                  src={item.img.img}
                  alt={`${item.id}1`}
                ></img>
                <div className="w-full flex flex-col items-center mt-4 md:mt-10 border-b-2 border-gray-200">
                  <h1 className="font-bold text-2xl underline border-b-2 border-gray-200">
                    {item.title}
                  </h1>
                  <p className="m-4 md:m-10 text-lg">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
