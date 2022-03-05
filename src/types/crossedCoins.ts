import { DetailedCoin } from "./detailedCoins";
import { PersonalCoin } from "./personalCoins";

export type CrossedCoins = CrossedCoin[];

export type CrossedCoin = PersonalCoin & DetailedCoin;
