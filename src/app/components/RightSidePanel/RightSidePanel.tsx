"use client";
import React from "react";
import LocaleChange from "../LanguageChange/LanguageChange";
import DropDown from "../DropDown/DropDown";
import AuthenticationButton from "../logoutButton/LoggoutButton";
import { useLocale } from "../providers/LanguageContext";
import useTheme from "../../hooks/useTheme";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { TbSquareRoundedChevronLeftFilled } from "react-icons/tb";

import { DictionaryChapter } from "src/app/[lang]/dictionaries";
import CartDialog from "../CartDialog/CartDialog";

interface RightSidePanelProps {
  currentUser: User | null;
  dict: DictionaryChapter;
}

export default function RightSidePanel(props: RightSidePanelProps) {
  const { locale } = useLocale();
  const { themeOptions } = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 w-20 h-16 bg-transparent cursor-pointer z-20 ${
          !isHovered ? "transform translate-x-0" : "transform translate-x-full"
        }`}
        data-cy="right-side-panel"
        onMouseEnter={() => setIsHovered(true)}
      >
        <TbSquareRoundedChevronLeftFilled className="w-20 h-20  "></TbSquareRoundedChevronLeftFilled>
      </div>
      <aside
        className={`flex flex-col h-full fixed justify-between items-center bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-200 w-64 overflow-hidden z-20 right-0 p-4 transition-transform duration-300 ${
          isHovered ? "transform translate-x-0" : "transform translate-x-full"
        }`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-row gap-4 items-start justify-between w-full">
          <DropDown content={themeOptions} />
          <div className="flex flex-col gap-4">
            <LocaleChange />
            <CartDialog></CartDialog>
          </div>
        </div>
        <div className="w-full mb-4 flex flex-row">
          <div data-cy="logout-button">
            <AuthenticationButton
              locale={locale}
              href={`/${locale}/login`}
              type="logout"
              buttonText={props.dict.Logout}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
