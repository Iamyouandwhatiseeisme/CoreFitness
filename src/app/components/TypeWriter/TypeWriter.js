import React, { useState, useEffect } from "react";

export default function TypeWriter({ isLoading, aiResponse, delay }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < aiResponse.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + aiResponse[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, aiResponse]);
  return (
    <textarea
      className="flex flex-col w-full border border-solid border-gray-400 bg-gray-800 rounded-xl resize-none font-serif text-sm"
      readOnly
      value={currentText}
    ></textarea>
  );
}
