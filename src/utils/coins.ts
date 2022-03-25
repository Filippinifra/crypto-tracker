import { PersonalCoins } from "types/personalCoins";
import { DetailedCoins } from "types/detailedCoins";
import { WalletDivision } from "types/walletDivision";
import { RebalancingCoins } from "types/rebalancingCoins";
import { CrossedCoins } from "types/crossedCoins";

export const toRebalancingCoins = (crossedCoins: CrossedCoins, walletDivision: WalletDivision, sumFiatValue: number): RebalancingCoins => {
  return crossedCoins.map((crossedCoin) => {
    const { typologyId, image, symbol, name, percentage, currentPrice, priceChangePercentage24h, coins, id, keyElement, platform } = crossedCoin;

    const idealAllocationPercentageTypology = walletDivision.find(({ typologyId: typologyWalletId }) => typologyWalletId === typologyId)?.percentage || 0;
    const idealAllocationValue = (((sumFiatValue / 100) * idealAllocationPercentageTypology) / 100) * percentage;

    const holdingInFiat = coins * (currentPrice || 0);
    const balancingPercentage = (holdingInFiat / idealAllocationValue) * 100;
    const rebalancingInFiat = holdingInFiat - idealAllocationValue;
    const rebalancingCoins = idealAllocationValue / currentPrice - coins;

    const symbolAndName = [symbol?.toUpperCase(), name].filter(Boolean).join(" | ");

    return {
      id,
      typologyId,
      logoUrl: image,
      symbolAndName,
      allocationPercentage: percentage,
      idealAllocationValue,
      price: currentPrice,
      priceChangePercentage24h,
      coins,
      holdingInFiat,
      balancingPercentage,
      rebalancingInFiat,
      rebalancingCoins,
      keyElement,
      platform,
    };
  });
};

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
