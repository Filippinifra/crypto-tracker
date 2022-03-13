import { DetailedCoin } from "types/detailedCoins";
import { PersonalCoin } from "types/personalCoins";

export type CrossedCoins = CrossedCoin[];

export type CrossedCoin = PersonalCoin & DetailedCoin;
