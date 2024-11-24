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
    var updatedLocale: string;
    if (locale === "ka") {
      updatedLocale = "en-US";
      setChecked(false);
    } else {
      updatedLocale = "ka";
      setChecked(true);
    }

    let updatedPath = pathname.replace(`/${locale}`, `/${updatedLocale}`);
    setLocale(updatedLocale);
    router.push(updatedPath);
  };

  return (
    <div className="flex flex-row h-7 w-32 items-center rounded-br-full rounded-bl-full border border-gray-200 rounded-xl p-3 dark:bg-yellow-500 bg-teal-400">
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
