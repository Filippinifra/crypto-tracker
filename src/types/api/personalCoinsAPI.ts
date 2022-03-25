export type PersonalCoinsDTO = PersonalCoin[];

interface PersonalCoin {
  id: string;
  typologyId: string;
  percentage: number;
  platform: string;
  coins: number;
  keyElement: string;
}
