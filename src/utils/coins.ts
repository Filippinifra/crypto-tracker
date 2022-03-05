import { PersonalCoins } from "types/personalCoins";
import { DetailedCoins } from "types/detailedCoins";
import { DetailedCoinsAPI } from "types/api/detailedCoinsAPI";
import { WalletDivision } from "types/walletDivision";
import { RebalancingCoins } from "types/rebalancingCoins";
import { CrossedCoins } from "types/crossedCoins";

export const toRebalancingCoins = (crossedCoins: CrossedCoins, walletDivision: WalletDivision, sumFiatValue: number): RebalancingCoins => {
  return crossedCoins.map(({ typology, image, symbol, name, percentage, currentPrice, priceChangePercentage24h, coins, id }) => {
    const allocationPercentageTypology = walletDivision.find(({ typology: typologyWallet }) => typologyWallet === typology)?.percentage || 0;
    const allocationCoin = (((sumFiatValue / 100) * allocationPercentageTypology) / 100) * percentage;

    return {
      id,
      typology: typology,
      logoUrl: image || "",
      symbolAndName: [symbol?.toUpperCase(), name].filter(Boolean).join(" | "),
      allocationPercentage: percentage,
      idealAllocationValue: allocationCoin,
      price: currentPrice || 0,
      priceChangePercentage24h: priceChangePercentage24h || 0,
      tokens: coins,
      holdingInFiat: coins * (currentPrice || 0),
      balancingPercentage: 10,
      rebalancingInFiat: 10,
      rebalancingTokens: 10,
    };
  });
};

export const toDetailedCoin = (detailedCoins: DetailedCoinsAPI): DetailedCoins =>
  detailedCoins
    ? detailedCoins.map(({ id, symbol, name, image, current_price, price_change_percentage_24h }) => ({
        id,
        symbol,
        name,
        image,
        currentPrice: current_price,
        priceChangePercentage24h: price_change_percentage_24h,
      }))
    : [];

type ExcludesFalse = <T>(x: T | false) => x is T;

export const getCrossedCoins = (personalCoins: PersonalCoins, detailedCoins: DetailedCoins): CrossedCoins => {
  if (personalCoins) {
    const crossedCoins = personalCoins.map((personalCoin) => {
      const crossedCoin = detailedCoins?.find(({ id: detailedCoinId }) => personalCoin.id === detailedCoinId);
      return crossedCoin !== undefined && { ...personalCoin, ...crossedCoin };
    });

    return crossedCoins.filter(Boolean as any as ExcludesFalse);
  }

  return [];
};
