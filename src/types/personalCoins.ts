export type PersonalCoins = PersonalCoin[];

export interface PersonalCoin {
  id: string;
  typology: string;
  percentage: number;
  platform: string;
  coins: number;
  keyElement: string;
}
