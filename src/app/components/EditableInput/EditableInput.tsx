import React, { useState } from "react";
import { EditableInputProps } from "../types";
import { toast, Toaster } from "sonner";
export default function EditableInput(props: EditableInputProps) {
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
        toast(`Verification email sent to ${value}`);
      }
      if (responseData.updateType === "name") {
        toast(`Updated name`);
      }
    }
  }

  return (
    <div className="flex flex-row  items-center justify-items-start  gap-5  ">
      <Toaster></Toaster>
      <label className="w-10 pr-2 ">{props.label}</label>
      <input
        className="rounded-2xl h-10 w- text-start w-48 pl-2 bg-white dark:text-black"
        type="email"
        value={value}
        onSubmit={handleApiCall}
        onChange={handleValueChange}
      ></input>
      <button
        className="rounded-2xl border dark:text-black bg-white border-black h-10 w-20"
        onClick={handleApiCall}
      >
        {props.updateButtonText}
      </button>
    </div>
  );
}
