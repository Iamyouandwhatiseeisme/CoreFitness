"use client";
import { usePathname } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
import React from "react";
import { Dictionary } from "src/app/[lang]/dictionaries";
import { createClient } from "src/app/utils/supabase/client";

const localeContext = createContext<LocaleContextType | null>(null);
const locales = ["en-US", "ka"];

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  dictionary: Dictionary;
}

interface LocaleProviderProps {
  lang: string;
  children: React.ReactNode;
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const [locale, setLocale] = useState<string>(props.lang);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  const pathname = usePathname();

  useEffect(() => {
    async function fetchDictionary() {
      const currentLocale =
        locales.find((locale) => pathname.includes(`/${locale}`)) ?? props.lang;
      setLocale(currentLocale);
      const { data } = await supabase
        .from("dictionary")
        .select()
        .eq("locale", currentLocale)
        .single();
      if (data) {
        setDictionary(data.dictionary);
      }
      setLoading(false);
    }
    fetchDictionary();
  }, [locale, pathname, props.lang, supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  const passedLocale: LocaleContextType = {
    locale: locale,
    setLocale(locale) {
      setLocale(locale);
    },
    dictionary: dictionary!,
  };

  return (
    <localeContext.Provider value={passedLocale}>
      {props.children}
    </localeContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(localeContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
