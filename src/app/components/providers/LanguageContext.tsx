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

export const LocaleProvider = (props: {
  children: React.ReactNode;
  dictChat: Record<string, string>;
  informationBoard: Record<string, string>;
}) => {
  const [locale, setLocale] = useState("en-US");
  const pathname = usePathname();

  useEffect(() => {
    let currentLocale = locales.find((locale) =>
      pathname.includes(`/${locale}`)
    );
    setLocale(currentLocale);
  }, [locale, pathname]);

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

export const useLocale = () => useContext(localeContext);
