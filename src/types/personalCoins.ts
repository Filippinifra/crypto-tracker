export type PersonalCoins = PersonalCoin[];

export interface PersonalCoin {
  id: string;
  typologyId: string;
  percentage: number;
  platform: string;
  coins: number;
  keyElement: string;
}
