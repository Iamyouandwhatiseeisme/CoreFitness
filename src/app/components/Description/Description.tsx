import { Equipment } from "src/app/[lang]/equipment/page";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface DescriptionProps {
  item: Equipment;
  locale: string;
}

export default function Description(props: DescriptionProps) {
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
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [item.id]);

  return (
    <div>
      <motion.div
        className="absolute right-0 text-xs sm:text-xl font-thin top-72 z-40 w-1/2 h-1/2"
        id={`description-${item.id}`}
        initial={{ opacity: 0, y: 80 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {locale === "ka" ? item.description_ka : item.description}
      </motion.div>
      <motion.div
        className="absolute right-0 text-xs sm:text-xl font-thin top-40 z-40 w-1/2 h-1/2"
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
