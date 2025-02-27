"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "src/app/components/providers/LanguageContext";

interface Equipment {
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
    <div className="w-full min-h-screen ">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-col  w-full ">
          {equipment.map((item) => {
            const description =
              locale === "ka" ? item.description_ka : item.description;
            return (
              <div
                key={item.id}
                className="w-full h-auto bg-white/20 dark:bg-gray-900/30 flex flex-col md:flex-row items-start justify-between border border-gray-500 dark:border-gray-600 rounded-2xl transition-colors duration-300"
              >
                <div className=" relative bg-gradient-to-r from-slate-50/50 to-gray-300/50 dark:from-gray-900/40 dark:via-gray-800/80 dark:to-gray-700/70 z-20  min-h-screen">
                  <img
                    className="w-full  border-gray-200 dark:border-gray-700 object-cover z-10 "
                    src={item.img.img}
                    key={item.id}
                    alt={`${item.id}1`}
                  />
                  <div className="absolute inset-0 bg-black/60 z-20"></div>
                </div>

                {/* //   <div className="w-full flex flex-col items-center mt-4 md:mt-10 border-gray-200 dark:border-gray-700">
              //     <h1 className="font-bold text-2xl underline border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              //       {item.title}
              //     </h1>
              //     <p className="m-4 md:m-10 text-lg text-gray-800 dark:text-gray-300">
              //       {description}
              //     </p>
              //   </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
