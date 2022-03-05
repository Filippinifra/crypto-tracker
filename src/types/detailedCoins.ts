export type DetailedCoins = DetailedCoin[];

export interface DetailedCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
}
