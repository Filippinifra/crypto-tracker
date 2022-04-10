import { FC } from "react";
import styled from "styled-components";
import { Currency } from "types/currency";
import { PersonalCoins } from "types/personalCoins";
import { ChangeCurrencyButton } from "components/ChangeCurrencyButton";
import { RefreshButton } from "components/RefreshButton";
import { useResponsive } from "hooks/useResponsive";
import { Spacer } from "components/Spacer";
import { LogoutButton } from "components/LogoutButton";
import { InfoButton } from "components/InfoButton";
import { HomeWrapperWidth } from "utils/dimensions";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const Wrapper = styled.div`
  height: auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  z-index: 99999;
  width: 100%;
  max-width: ${HomeWrapperWidth}px;
  margin: auto;
`;

export const Layout: FC<{ prefCurrency: Currency; setPrefCurrency: (newCurrency: Currency) => void; personalCoins: PersonalCoins }> = ({ children, prefCurrency, setPrefCurrency, personalCoins }) => {
  const { getResponsiveValue } = useResponsive();

  return (
    <Wrapper style={{ padding: `40px ${getResponsiveValue([8, 15, 40])}px`, maxWidth: HomeWrapperWidth, margin: "auto" }}>
      <ButtonsWrapper style={{ gap: getResponsiveValue([20, 25, 30]), width: `calc(100% - ${getResponsiveValue([8, 15, 40]) * 2}px)` }}>
        <ChangeLanguageButton />
        <InfoButton />
        <LogoutButton />
        <ChangeCurrencyButton prefCurrency={prefCurrency} setPrefCurrency={setPrefCurrency} />
        <RefreshButton personalCoins={personalCoins} prefCurrency={prefCurrency} />
      </ButtonsWrapper>
      {getResponsiveValue([true, true, false]) && <Spacer size={50} />}
      {children}
    </Wrapper>
  );
};
