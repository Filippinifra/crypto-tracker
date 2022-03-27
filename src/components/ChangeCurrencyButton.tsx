import { FC } from "react";
import { Currency, getSymbolForCurrency } from "types/currency";
import { Button } from "components/Button";
import { Typography } from "components/Typography";

export const ChangeCurrencyButton: FC<{ prefCurrency: Currency; setPrefCurrency: (newCurrency: Currency) => void }> = ({ prefCurrency, setPrefCurrency }) => {
  const changeCurrency = () => {
    const newCurrency = prefCurrency === Currency.EUR ? Currency.USD : Currency.EUR;
    setPrefCurrency(newCurrency);
  };

  return prefCurrency !== undefined ? (
    <Button onClick={changeCurrency}>
      <Typography variant="body2" style={{ marginLeft: 2 }}>
        {getSymbolForCurrency(prefCurrency)}
      </Typography>
    </Button>
  ) : null;
};
