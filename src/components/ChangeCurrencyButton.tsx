import { Dispatch, FC, SetStateAction } from "react";
import { Currency, getSymbolForCurrency } from "types/currency";
import { Button } from "components/Button";
import { Typography } from "components/Typography";

export const ChangeCurrencyButton: FC<{ prefCurrency: Currency; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>> }> = ({ prefCurrency, setPrefCurrency }) => {
  const changeCurrency = () => {
    setPrefCurrency(prefCurrency === Currency.EUR ? Currency.USD : Currency.EUR);
  };

  return prefCurrency !== undefined ? (
    <Button onClick={changeCurrency}>
      <Typography variant="body" style={{ marginLeft: 2 }}>
        {getSymbolForCurrency(prefCurrency)}
      </Typography>
    </Button>
  ) : null;
};
