import React, { FC, useMemo } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { WalletDivision } from "types/walletDivision";
import { PersonalCoin, PersonalCoins } from "types/personalCoins";
import { useResponsive } from "hooks/useResponsive";

export const DoughnutCompleteChart: FC<{ wallet: WalletDivision; personalCoins: PersonalCoins }> = ({ wallet, personalCoins }) => {
  const { getCustomResponsiveValue } = useResponsive();

  const data = useMemo(
    () => ({
      name: "nivo",
      color: "",
      children: wallet.map(({ typologyName, typologyId, color, percentage: walletPercentage }) => {
        const typologyCoins = personalCoins.filter(({ typologyId: personalCoinTypology }) => typologyId === personalCoinTypology);

        // @ts-ignore
        const noMultipleTypologyCoins = typologyCoins.reduce((r: PersonalCoins, coin: PersonalCoin) => {
          const coinAlreadyExists = r.some(({ id }) => id === coin.id);

          if (coinAlreadyExists) {
            const aggregateCoins = r.map((aggregateCoin) => {
              if (aggregateCoin.id === coin.id) {
                return { ...aggregateCoin, coins: aggregateCoin.coins + coin.coins, percentage: aggregateCoin.percentage + coin.percentage };
              }

              return aggregateCoin;
            });

            return aggregateCoins;
          }

          return [...r, coin];
        }, []);

        return {
          name: typologyName,
          color,
          children: noMultipleTypologyCoins.map(({ percentage, id }) => ({ name: id, loc: percentage * walletPercentage })).sort(({ loc: loc1 }, { loc: loc2 }) => loc2 - loc1),
        };
      }),
    }),
    [wallet, personalCoins]
  );

  const dimensionValue = getCustomResponsiveValue([
    [1200, 500],
    [1050, 400],
    [950, 300],
    [800, 400],
    [450, 300],
  ]);

  return (
    <div style={{ width: dimensionValue, height: dimensionValue }}>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={5}
        colors={({ data }) => data.color}
        childColor={{
          from: "color",
          modifiers: [["opacity", 0.6]],
        }}
        borderWidth={3}
      />
    </div>
  );
};
