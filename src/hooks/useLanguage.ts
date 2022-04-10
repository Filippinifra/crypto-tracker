import i18n, { Languages } from "utils/i18next";
import { useEffect, useState } from "react";

export const useLanguage = () => {
  const initialLanguage = Languages.en;
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return { language, setLanguage };
};
