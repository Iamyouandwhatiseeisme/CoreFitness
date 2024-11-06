import i18next, { changeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./app/components/localization/en";
import ka from "./app/components/localization/ka";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "en",
    lng: "en",
    resources: {
      en: {
        translation: en,
      },
      ka: {
        translation: ka,
      },
    },
  });

export default i18next;
