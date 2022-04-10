import { resources } from "utils/translations";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export enum Languages {
  it = "it",
  en = "en",
}
export const defaultLang = Languages.en;
export const availableLanguages = [Languages.en, Languages.it];
export const mapLanguageToFlag = {
  [Languages.it]: "🇮🇹",
  [Languages.en]: "🇬🇧",
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: defaultLang,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
