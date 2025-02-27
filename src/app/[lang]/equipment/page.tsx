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
        // <div className="flex flex-col gap-10 w-full p-4 md:p-10">
        //   {equipment.map((item) => {
        //     const description =
        //       locale === "ka" ? item.description_ka : item.description;
        //     return (
        //       <div
        //         key={item.id}
        //         className="w-full h-auto bg-white/20 dark:bg-gray-900/30 flex flex-col md:flex-row items-start justify-between border border-gray-500 dark:border-gray-600 rounded-2xl transition-colors duration-300"
        //       >
        //         <img
        //           className="w-full max-w-[520px] min-w-[300px] max-h-[520px] p-20 min-h-[300px] md:w-1/2 bg-gray-100 dark:bg-gray-800 h-64 md:h-full rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl border border-gray-200 dark:border-gray-700 object-contain "
        //           src={item.img.img}
        //           alt={`${item.id}1`}
        //         />
        //         <div className="w-full flex flex-col items-center mt-4 md:mt-10 border-gray-200 dark:border-gray-700">
        //           <h1 className="font-bold text-2xl underline border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        //             {item.title}
        //           </h1>
        //           <p className="m-4 md:m-10 text-lg text-gray-800 dark:text-gray-300">
        //             {description}
        //           </p>
        //         </div>
        //       </div>
        //     );
        //   })}
        // </div>
        <div></div>
      )}
    </div>
  );
}
