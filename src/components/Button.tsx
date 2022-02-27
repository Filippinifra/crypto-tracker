import { usePrefCurrency } from "hooks/usePrefCurrency";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Currency, getSymbolForCurrency } from "types/currency";
import { shadowStyle } from "./style";
import { Typography } from "./Typography";

const ButtonStyled = styled.div`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  ${shadowStyle}
  font-size: 14px;
  cursor: pointer;
`;

export const Button: FC<{ onClick: () => void }> = ({ children, ...others }) => {
  return <ButtonStyled {...others}>{children}</ButtonStyled>;
};

export const RefreshButton: FC = () => {
  const { reload } = useRouter();

  const refreshData = () => {
    reload();
  };

  return (
    <Button
      onClick={() => {
        refreshData();
      }}
    >
      <Typography variant="body">Ricarica</Typography>
    </Button>
  );
};

export const ChangeCurrencyButton: FC<{ prefCurrency: Currency | undefined; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>> }> = ({ prefCurrency, setPrefCurrency }) => {
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
