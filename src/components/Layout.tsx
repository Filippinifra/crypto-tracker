import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Currency } from "types/currency";
import { PersonalCoins } from "types/personalCoins";
import { ChangeCurrencyButton } from "components/ChangeCurrencyButton";
import { RefreshButton } from "components/RefreshButton";
import { Button } from "components/Button";
import { useAuth } from "hooks/useAuth";
import { Typography } from "components/Typography";
import { auth } from "utils/firebase";

const Wrapper = styled.div`
  padding: 40px;
  height: auto;
`;

export const Layout: FC<{ prefCurrency: Currency; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>>; personalCoins: PersonalCoins }> = ({
  children,
  prefCurrency,
  setPrefCurrency,
  personalCoins,
}) => {
  const { setCurrentUser } = useAuth();

  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 30, position: "fixed", right: 40 }}>
        <Button
          onClick={() => {
            auth.signOut();
            setCurrentUser(undefined);
          }}
        >
          <Typography variant="body2">Esci</Typography>
        </Button>
        <ChangeCurrencyButton prefCurrency={prefCurrency} setPrefCurrency={setPrefCurrency} />
        <RefreshButton personalCoins={personalCoins} prefCurrency={prefCurrency} />
      </div>
      {children}
    </Wrapper>
  );
};
