export type RebalancingCoins = RebalancingCoin[];

export interface RebalancingCoin {
  id: string;
  typologyId: string;
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
  keyElement: string;
  platform: string;
}

export type EditingRebalancingCoins = EditingRebalancingCoin[];

export interface EditingRebalancingCoin {
  id: string;
  typologyId: string;
  logoUrl: string;
  symbolAndName: string;
  allocationPercentage: number | null;
  idealAllocationValue: number;
  price: number;
  priceChangePercentage24h: number;
  coins: number | null;
  holdingInFiat: number;
  balancingPercentage: number;
  rebalancingInFiat: number;
  rebalancingCoins: number;
  keyElement: string;
  platform: string;
}
