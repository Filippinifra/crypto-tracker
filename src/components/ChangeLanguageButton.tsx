import { Button } from "components/Button";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { availableLanguages, mapLanguageToFlagCode } from "utils/i18next";
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
    return getUnicodeFlagIcon(mapLanguageToFlagCode[language]);
  }, [language]);

  return (
    <Button onClick={onChangeLanguage} style={{ padding: "0 5px" }}>
      <Typography variant="body2">{currentFlag}</Typography>
    </Button>
  );
};
