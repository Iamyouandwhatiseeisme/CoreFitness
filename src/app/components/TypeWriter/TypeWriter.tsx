import React, { useState, useEffect } from "react";

interface TypeWriterProps {
  aiResponse: string;
  delay: number;
}

export default function TypeWriter(props: TypeWriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < props.aiResponse.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + props.aiResponse[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, props.delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, props.delay, props.aiResponse]);
  return (
    <textarea
      className="flex flex-col w-full border border-solid border-gray-400 bg-gray-800 rounded-xl resize-none font-serif text-sm"
      readOnly
      value={currentText}
    ></textarea>
  );
}
