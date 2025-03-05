"use client";
import React, { useEffect, useState } from "react";
import Description from "src/app/components/Description/Description";
import { useLocale } from "src/app/components/providers/LanguageContext";

export interface Equipment {
  id: number;
  img: {
    img: string;
  };
  title: string;
  title_ka: string;
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
    <div className="w-full min-h-screen  ">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-col w-full ">
          {equipment.length !== 0 &&
            equipment.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full h-auto lex flex-col md:flex-row items-start justify-between border "
                >
                  <div className=" relative bg-gradient-to-r from-slate-50/50 to-gray-300/50 dark:from-gray-900/40 dark:via-gray-800/80 dark:to-gray-700/70 z-20  min-h-screen">
                    <img
                      className="w-full bg-fixed border-gray-200 dark:border-gray-700 object-cover z-10 "
                      src={item.img.img}
                      key={item.id}
                      alt={`${item.id}1`}
                    />
                    <Description locale={locale} item={item}></Description>

                    <div className="absolute inset-0 bg-black/80 z-20"></div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
