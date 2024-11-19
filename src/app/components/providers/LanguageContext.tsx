"use client";
import { usePathname } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const localeContext = createContext<LocaleContextType | null>(null);
let locales = ["en-US", "ka"];

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  chatWindow: Record<string, string>;
  informationBoard: Record<string, string>;
}
interface LocaleProviderProps {
  lang: string;
  children: React.ReactNode;
  dictChat: Record<string, string>;
  informationBoard: Record<string, string>;
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const [locale, setLocale] = useState<string>(props.lang);
  const pathname = usePathname();

  useEffect(() => {
    let currentLocale =
      locales.find((locale) => pathname.includes(`/${locale}`)) ?? props.lang;
    setLocale(currentLocale);
  }, [locale, pathname, props.lang]);

  const passedLocale: LocaleContextType = {
    locale: locale,
    setLocale(locale) {
      setLocale(locale);
    },
    chatWindow: props.dictChat,
    informationBoard: props.informationBoard,
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
