import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Currency } from "types/currency";
import { ChangeCurrencyButton, RefreshButton } from "components/Button";

const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
`;

export const Layout: FC<{ prefCurrency: Currency | undefined; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>> }> = ({ children, prefCurrency, setPrefCurrency }) => {
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 40, position: "fixed", right: 20 }}>
        <ChangeCurrencyButton prefCurrency={prefCurrency} setPrefCurrency={setPrefCurrency} />
        <RefreshButton />
      </div>
      {children}
    </Wrapper>
  );
};
