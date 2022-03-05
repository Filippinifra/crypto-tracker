import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Currency, getSymbolForCurrency } from "types/currency";
import { shadowStyle } from "components/ShadowStyle";
import { Typography } from "components/Typography";
import { PersonalCoins } from "types/personalCoins";
import { useDetailedCoins } from "hooks/useDetailedCoins";

const ButtonStyled = styled.div`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  ${shadowStyle}
  font-size: 14px;
  cursor: pointer;
  background-color: white;
`;

export const Button: FC<{ onClick: () => void }> = ({ children, ...others }) => {
  return <ButtonStyled {...others}>{children}</ButtonStyled>;
};

export const RefreshButton: FC<{ personalCoins: PersonalCoins; prefCurrency: Currency }> = ({ personalCoins, prefCurrency }) => {
  const { mutate } = useDetailedCoins(personalCoins, prefCurrency);

  return (
    <Button
      onClick={() => {
        mutate();
      }}
    >
      <Typography variant="body">Ricarica</Typography>
    </Button>
  );
};

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
