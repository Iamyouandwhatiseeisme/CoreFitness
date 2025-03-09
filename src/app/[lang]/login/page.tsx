"use client";
import { useState } from "react";
import LoginPageBoard from "../../components/LoginPageBoard/LoginPageBoard";
import React from "react";
import { Toaster } from "sonner";
import AuthenticationForm from "src/app/components/AuthenticationForm/AuthenticationForm";

export default function LogIn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-col lg:flex-row">
      <LoginPageBoard
        isHovered={isHovered}
        setIsHoverd={setIsHovered}
      ></LoginPageBoard>
      <Toaster></Toaster>
      <AuthenticationForm></AuthenticationForm>
    </div>
  );
}
