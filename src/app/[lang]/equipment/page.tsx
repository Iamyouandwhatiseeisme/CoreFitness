"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "src/app/components/providers/LanguageContext";
import { motion } from "framer-motion";

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
    <div className="w-full min-h-screen  ">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-col w-full ">
          {equipment.map((item) => {
            const description =
              locale === "ka" ? item.description_ka : item.description;
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

interface DescriptionProps {
  item: Equipment;
  locale: string;
}

export function Description(props: DescriptionProps) {
  const item = props.item;
  const locale = props.locale;
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(`description-${item.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        console.log("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <motion.div
        className="absolute right-0 text-xl font-thin top-72 z-40 w-1/2 h-1/2"
        id={`description-${item.id}`}
        initial={{ opacity: 0, y: 80 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {locale === "ka" ? item.description_ka : item.description}
      </motion.div>
      <motion.div
        className="absolute right-0 text-xl font-thin top-40 z-40 w-1/2 h-1/2"
        id={`description-${item.id}`}
        initial={{ opacity: 0, x: 40 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {locale === "ka" ? item.title_ka : item.title}
      </motion.div>
    </div>
  );
}
