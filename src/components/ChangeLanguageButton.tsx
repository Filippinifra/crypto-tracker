import { Button } from "components/Button";
import { availableLanguages, mapLanguageToFlag } from "utils/i18next";
import { useMemo } from "react";
import { useLanguage } from "hooks/useLanguage";
import { Typography } from "components/Typography";

export const ChangeLanguageButton = () => {
  const { language, setLanguage } = useLanguage();

  const onChangeLanguage = () => {
    const currentIndexLanguage = availableLanguages.indexOf(language);
    const nextIndex = currentIndexLanguage === availableLanguages.length - 1 ? 0 : currentIndexLanguage + 1;
    const nextLanguage = availableLanguages[nextIndex];

    setLanguage(nextLanguage);
  };

  const currentFlag = useMemo(() => {
    return mapLanguageToFlag[language];
  }, [language]);

  return (
    <Button onClick={onChangeLanguage} style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center", paddingRight: 2 }}>
      <Typography variant="body2">{currentFlag}</Typography>
    </Button>
  );
};
