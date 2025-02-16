import React, { useState } from "react";
import { EditableInputProps } from "../types";
import { toast, Toaster } from "sonner";
import { useLocale } from "../providers/LanguageContext";
export default function EditableInput(props: EditableInputProps) {
  const {
    dictionary: { toast: toastDict },
  } = useLocale();
  const [value, setValue] = useState<string>(props.value);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  async function handleApiCall() {
    const response = await fetch(props.apiEndpoint, {
      method: "POST",
      headers: {
        newValue: value,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.updateType === "email") {
        toast(`${toastDict.VerifSent} ${value}`);
      }
      if (responseData.updateType === "name") {
        toast(toastDict.UpdatedName);
      }
    }
  }

  return (
    <div className="flex flex-row  items-start justify-center  gap-5 m-auto   ">
      <Toaster></Toaster>

      <input
        className="rounded-2xl h-10 text-start w-48 pl-2 bg-white dark:text-black shadow-sm shadow-black"
        type="email"
        value={value}
        onSubmit={handleApiCall}
        onChange={handleValueChange}
      ></input>
      <button
        className="rounded-2xl border text-sm max-w-12 dark:text-black bg-white border-black h-10 w-full shadow-sm shadow-black transition-transform transform hover:scale-105 hover:bg-gray-200"
        onClick={handleApiCall}
      >
        {props.updateButtonText}
      </button>
    </div>
  );
}
