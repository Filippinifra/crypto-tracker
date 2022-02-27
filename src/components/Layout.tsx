import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Currency } from "types/currency";
import { ChangeCurrencyButton, RefreshButton } from "./Button";
import { Spacer } from "./Spacer";

const Wrapper = styled.div`
  height: 100vh;
  padding: 20px;
`;

export const Layout: FC<{ prefCurrency: Currency | undefined; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>> }> = ({ children, prefCurrency, setPrefCurrency }) => {
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 40 }}>
        <ChangeCurrencyButton prefCurrency={prefCurrency} setPrefCurrency={setPrefCurrency} />
        <RefreshButton />
      </div>
      <Spacer size={20} />
      {children}
    </Wrapper>
  );
};
