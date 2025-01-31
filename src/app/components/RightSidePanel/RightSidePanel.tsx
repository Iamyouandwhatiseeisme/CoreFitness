"use client";
import React from "react";
import LocaleChange from "../LanguageChange/LanguageChange";
import DropDown from "../DropDown/DropDown";
import AuthenticationButton from "../logoutButton/LoggoutButton";
import { useLocale } from "../providers/LanguageContext";
import useTheme from "../../hooks/useTheme";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

import { DictionaryChapter } from "src/app/[lang]/dictionaries";

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
        className="fixed right-0 top-1/2 transform -translate-y-1/2 w-20 h-16 bg-gray-300 cursor-pointer z-20"
        onMouseEnter={() => setIsHovered(true)}
      ></div>
      <aside
        className={`flex flex-col h-full fixed justify-between items-center bg-slate-50 dark:bg-black text-header-green w-64 overflow-hidden z-20 right-0 p-4 transition-transform duration-300 ${
          isHovered ? "transform translate-x-0" : "transform translate-x-full"
        }`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-row gap-4 items-center justify-between w-full">
          <DropDown content={themeOptions} />
          <div data-cy="logout-button">
            {props.currentUser === null ? (
              <AuthenticationButton
                locale={locale}
                href={`/${locale}/login`}
                type="login"
                buttonText={props.dict.Login}
              />
            ) : (
              <AuthenticationButton
                locale={locale}
                href={`/${locale}/login`}
                type="logout"
                buttonText={props.dict.Logout}
              />
            )}
          </div>
        </div>
        <div className="w-full mb-4">
          <LocaleChange />
        </div>
      </aside>
    </>
  );
}
