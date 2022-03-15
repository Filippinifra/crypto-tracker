import { Dispatch, FC, SetStateAction } from "react";
import { Currency, getSymbolForCurrency } from "types/currency";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useToast } from "hooks/useToast";

export const ChangeCurrencyButton: FC<{ prefCurrency: Currency; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>> }> = ({ prefCurrency, setPrefCurrency }) => {
  const { showToast } = useToast();

  const changeCurrency = () => {
    const newCurrency = prefCurrency === Currency.EUR ? Currency.USD : Currency.EUR;
    setPrefCurrency(newCurrency);
    showToast(`La valuta è stata cambiata in ${Currency[newCurrency]}`, "success");
    showToast(`Attenzione! È necessario cambiare manualmente il totale investito in ${Currency[newCurrency]}`, "warning");
  };

  return prefCurrency !== undefined ? (
    <Button onClick={changeCurrency}>
      <Typography variant="body2" style={{ marginLeft: 2 }}>
        {getSymbolForCurrency(prefCurrency)}
      </Typography>
    </Button>
  ) : null;
};
