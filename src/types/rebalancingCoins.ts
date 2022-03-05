export type RebalancingCoins = RebalancingCoin[];

export interface RebalancingCoin {
  id: string;
  typology: string;
  logoUrl: string;
  symbolAndName: string;
  allocationPercentage: number;
  idealAllocationValue: number;
  price: number;
  priceChangePercentage24h: number;
  coins: number;
  holdingInFiat: number;
  balancingPercentage: number;
  rebalancingInFiat: number;
  rebalancingCoins: number;
}
