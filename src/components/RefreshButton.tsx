import { useDetailedCoins } from "hooks/useDetailedCoins";
import { FC } from "react";
import { Currency } from "types/currency";
import { PersonalCoins } from "types/personalCoins";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useTranslation } from "react-i18next";

export const RefreshButton: FC<{ personalCoins: PersonalCoins; prefCurrency: Currency }> = ({ personalCoins, prefCurrency }) => {
  const { mutate } = useDetailedCoins(personalCoins, prefCurrency);
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => {
        mutate();
      }}
      disabled={!personalCoins.length}
    >
      <Typography variant="body2">{t("home.updatePricesButton")}</Typography>
    </Button>
  );
};
