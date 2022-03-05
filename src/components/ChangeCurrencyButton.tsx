import { Dispatch, FC, SetStateAction } from "react";
import { Currency, getSymbolForCurrency } from "types/currency";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useToast } from "contexts/ToastContext";

export const ChangeCurrencyButton: FC<{ prefCurrency: Currency; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>> }> = ({ prefCurrency, setPrefCurrency }) => {
  const { showToast } = useToast();

  const changeCurrency = () => {
    const newCurrency = prefCurrency === Currency.EUR ? Currency.USD : Currency.EUR;
    setPrefCurrency(newCurrency);
    showToast(`La valuta è stata cambiata in ${Currency[newCurrency]}`, "success");
  };

  return prefCurrency !== undefined ? (
    <Button onClick={changeCurrency}>
      <Typography variant="body" style={{ marginLeft: 2 }}>
        {getSymbolForCurrency(prefCurrency)}
      </Typography>
    </Button>
  ) : null;
};
