import { useDetailedCoins } from "hooks/useDetailedCoins";
import { FC } from "react";
import { Currency } from "types/currency";
import { PersonalCoins } from "types/personalCoins";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useToast } from "contexts/ToastContext";

export const RefreshButton: FC<{ personalCoins: PersonalCoins; prefCurrency: Currency }> = ({ personalCoins, prefCurrency }) => {
  const { mutate } = useDetailedCoins(personalCoins, prefCurrency);

  const { showToast } = useToast();

  return (
    <Button
      onClick={async () => {
        await mutate();
        showToast("I dati sono stati ricaricati", "success");
      }}
    >
      <Typography variant="body2">Ricarica</Typography>
    </Button>
  );
};
