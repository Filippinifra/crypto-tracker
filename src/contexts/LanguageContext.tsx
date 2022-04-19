import { useAuth } from "hooks/useAuth";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";
import { useEffect } from "react";
import { createContext, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { isBrowser } from "utils/browser";
import i18n, { Languages } from "utils/i18next";

const languageLocalStorageKey = "temp-language";
const defaultInitialLanguage = Languages.en;

let localStorageLanguage: null | string = null;
if (isBrowser) {
  localStorageLanguage = window.localStorage.getItem(languageLocalStorageKey);
}

export interface LanguageInterface {
  language: Languages | undefined;
  setLanguage: (newLang: Languages) => void;
  loading: boolean;
}

export const LanguageContext = createContext<LanguageInterface>({ language: undefined, setLanguage: () => {}, loading: true });

export const LanguageProvider: FC = ({ children }) => {
  const { currentUser } = useAuth();
  const { getLanguage: getDBLanguage, setLanguage: setDBLanguage } = useDatabase(currentUser || undefined);
  const { showToast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isSettingLanguage, setIsSettingLanguage] = useState(true);

  const [language, setLanguage] = useState<Languages | undefined>(undefined);

  const fetchDBLanguage = async () => {
    try {
      const response = await getDBLanguage();
      const language: Languages = response.val() || ((localStorageLanguage || defaultInitialLanguage) as Languages);

      setLanguage(language);
      i18n.changeLanguage(language);
      if (isBrowser) {
        window.localStorage.setItem(languageLocalStorageKey, language);
      }
    } catch (e) {
      showToast(t("language.errorOnFetch"), "error");
    } finally {
      setLoading(false);
    }
  };

  const updateLanguage = async (newLang: Languages) => {
    try {
      if (currentUser) {
        await setDBLanguage(newLang);
      }
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
      if (isBrowser) {
        window.localStorage.setItem(languageLocalStorageKey, newLang);
      }

      showToast(t("language.successOnUpdate"), "success");
    } catch (e) {
      showToast(t("language.errorOnUpdate"), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser !== undefined && loading && isSettingLanguage) {
      const userNotLogged = currentUser === null;

      setIsSettingLanguage(false);

      if (userNotLogged) {
        const language = (localStorageLanguage || defaultInitialLanguage) as Languages;

        setLanguage(language);
        i18n.changeLanguage(language);

        setLoading(false);
      } else {
        fetchDBLanguage();
      }
    }
  }, [currentUser, loading, isSettingLanguage, setIsSettingLanguage, setLanguage, setLoading, fetchDBLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: (newLang: Languages) => {
          updateLanguage(newLang);
        },
        loading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
