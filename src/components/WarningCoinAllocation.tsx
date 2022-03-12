import React, { FC } from "react";
import { RebalancingCoins } from "types/rebalancingCoins";
import { WalletDivision } from "types/walletDivision";
import { errorColor } from "utils/colors";
import { Icon } from "components/Icon";
import { Tooltip } from "components/Tooltip";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";

export const WarningCoinAllocation: FC<{ coins: RebalancingCoins; wallet: WalletDivision }> = ({ coins, wallet }) => {
  const typologyChecksElements = wallet.map(({ typology: walletTypology, color }) => {
    const coinByTipology = coins.filter(({ typology: coinTypology }) => walletTypology === coinTypology);
    const totalPercentageTypology = coinByTipology.reduce((r, { allocationPercentage }) => r + allocationPercentage, 0);

    const correctPercentage = totalPercentageTypology === 100;

    return {
      element: (
        <>
          <Typography variant="body">
            <span style={{ color, fontWeight: 600 }}>{walletTypology}</span>
            {`: ${totalPercentageTypology}% (${correctPercentage ? "Giusto" : "Sbagliato"})`}
          </Typography>
          <Spacer size={5} />
        </>
      ),
      correct: !correctPercentage,
      key: `warning-typology-allocation-${walletTypology}`,
    };
  });

  const showWarning = typologyChecksElements.some(({ correct }) => Boolean(correct));

  return showWarning ? (
    <Tooltip
      content={
        <div>
          <Typography variant="body">Non hai allocato la giusta percentuale a ogni tipologia:</Typography>
          <Spacer size={10} />
          {typologyChecksElements.map(({ element, key }) => (
            <React.Fragment key={key}>{element}</React.Fragment>
          ))}
        </div>
      }
      placement="top"
    >
      <Icon style={{ color: errorColor }} name="warning" />
    </Tooltip>
  ) : null;
};
