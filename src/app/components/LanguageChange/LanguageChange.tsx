"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useLocale } from "../providers/LanguageContext";
import { Switch } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

function LocaleChange() {
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (locale === "ka") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [locale]);

  const toggleLanguage = () => {
    let updatedLocale: string;
    if (locale === "ka") {
      updatedLocale = "en-US";
      setChecked(false);
    } else {
      updatedLocale = "ka";
      setChecked(true);
    }

    const updatedPath = pathname.replace(`/${locale}`, `/${updatedLocale}`);
    setLocale(updatedLocale);
    router.push(updatedPath);
  };

  return (
    <div className="flex flex-row h-7 mt-2 w-32 items-center rounded-br-full rounded-bl-full border  rounded-xl p-3 bg-white/5   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 dark:shadow-lg">
      <ReactCountryFlag
        countryCode="US"
        svg
        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
        cdnSuffix="svg"
        title="US"
      />
      <Switch checked={checked} color="secondary" onChange={toggleLanguage} />
      <ReactCountryFlag
        countryCode="GE"
        svg
        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
        cdnSuffix="svg"
        title="GE"
      />
    </div>
  );
}

export default LocaleChange;
