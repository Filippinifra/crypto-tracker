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
import { useResponsive } from "hooks/useResponsive";
import { Spacer } from "./Spacer";

const Wrapper = styled.div`
  height: auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  position: fixed;
  z-index: 99999;
`;

export const Layout: FC<{ prefCurrency: Currency; setPrefCurrency: Dispatch<SetStateAction<Currency | undefined>>; personalCoins: PersonalCoins }> = ({
  children,
  prefCurrency,
  setPrefCurrency,
  personalCoins,
}) => {
  const { setCurrentUser } = useAuth();
  const { getResponsiveValue } = useResponsive();

  return (
    <Wrapper style={{ padding: `40px ${getResponsiveValue([8, 15, 40])}px` }}>
      <ButtonsWrapper style={{ right: getResponsiveValue([8, 15, 40]) }}>
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
      </ButtonsWrapper>
      {getResponsiveValue([true, true, false]) && <Spacer size={50} />}
      {children}
    </Wrapper>
  );
};
