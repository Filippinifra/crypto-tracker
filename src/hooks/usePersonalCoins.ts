import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";

const tempCoins: PersonalCoins = [
  {
    id: "terrausd",
    typology: "Liquidity",
    percentage: 60,
    platform: "Anchor",
    coins: 1413,
    keyElement: "9b663bff-b733-4d88-a23f-f8b1b495c08a",
  },
  {
    id: "usd-coin",
    typology: "Liquidity",
    percentage: 40,
    platform: "Ledn",
    coins: 684,
    keyElement: "8df659c2-0954-4026-8b0d-37b1de1e279b",
  },
  {
    id: "bitcoin",
    typology: "Bigs",
    percentage: 50,
    platform: "Binance",
    coins: 0.01092773,
    keyElement: "ccc16a6c-87e9-4337-ae72-e441a0428ba3",
  },
  {
    id: "ethereum",
    typology: "Bigs",
    percentage: 50,
    platform: "Binance",
    coins: 0.12814528,
    keyElement: "8ffa84c2-8acd-4bfa-a45d-afef054b81c0",
  },
  {
    id: "solana",
    typology: "High cap",
    percentage: 20,
    platform: "Binance",
    coins: 1.0299,
    keyElement: "fde1ea29-a0de-4a73-a4a0-f11b5eeadd0a",
  },
  {
    id: "terra-luna",
    typology: "High cap",
    percentage: 20,
    platform: "Terra Station",
    coins: 2,
    keyElement: "161ead96-a947-425e-a5d0-3ba28ba9d3a8",
  },
  {
    id: "polkadot",
    typology: "High cap",
    percentage: 30,
    platform: "Binance",
    coins: 7.35394401,
    keyElement: "cba52b68-4140-43e6-aa6c-a9803051a84d",
  },
  {
    id: "binancecoin",
    typology: "High cap",
    percentage: 30,
    platform: "Binance",
    coins: 0.25146373,
    keyElement: "8131b112-81d7-4d6d-9d07-44f916b11fd4",
  },
  {
    id: "avalanche-2",
    typology: "Mid cap",
    percentage: 10,
    platform: "Binance",
    coins: 0.7838337,
    keyElement: "ba5a7fee-064c-4948-bf44-37dafe2e3c69",
  },
  {
    id: "matic-network",
    typology: "Mid cap",
    percentage: 10,
    platform: "Binance",
    coins: 36.22041551,
    keyElement: "e3672492-5ab8-4d07-b139-866ffbd9fd12",
  },
  {
    id: "fantom",
    typology: "Mid cap",
    percentage: 10,
    platform: "Binance",
    coins: 39.98253579,
    keyElement: "eefe5898-4eda-46e5-a244-2d90f2f0d0a6",
  },
  {
    id: "tezos",
    typology: "Mid cap",
    percentage: 10,
    platform: "Binance",
    coins: 15.12292975,
    keyElement: "9a8a9773-3963-48e3-8ef2-da2a837b8624",
  },
  {
    id: "stellar",
    typology: "Mid cap",
    percentage: 9,
    platform: "Binance",
    coins: 250.71603237,
    keyElement: "9ba60408-c2d2-4a3f-a6a6-41e7b8a62787",
  },
  {
    id: "decentraland",
    typology: "Mid cap",
    percentage: 25,
    platform: "Binance",
    coins: 10.31603183,
    keyElement: "6bb111d0-0756-4cd0-8cbd-50f5910a904d",
  },
  {
    id: "aave",
    typology: "Mid cap",
    percentage: 12,
    platform: "Binance",
    coins: 0.42551176,
    keyElement: "0b329a7b-d165-4cf1-9f45-de4d1752eb51",
  },
  {
    id: "ftx-token",
    typology: "Mid cap",
    percentage: 14,
    platform: "Binance",
    coins: 1.2987,
    keyElement: "00780d5b-e37c-4da4-ab54-f33122e0762a",
  },
  {
    id: "oasis-network",
    typology: "Low cap",
    percentage: 60,
    platform: "Binance",
    coins: 164.835,
    keyElement: "fac301bd-39bd-4609-957a-6aef2683dffc",
  },
  {
    id: "loopring",
    typology: "Low cap",
    percentage: 40,
    platform: "Binance",
    coins: 65.95485186,
    keyElement: "208059ce-0743-430f-8ab5-a4eab29ecb0f",
  },
  {
    id: "tokemak",
    typology: "Gambling",
    percentage: 34,
    platform: "Mexc",
    coins: 2.08,
    keyElement: "fd570449-15a0-4f04-bb19-238cf785e07e",
  },
  {
    id: "curve-dao-token",
    typology: "Gambling",
    percentage: 33,
    platform: "Binance",
    coins: 21.94541198,
    keyElement: "cf0d4c42-f802-4cb7-81d7-0f7be9b5ddaf",
  },
  {
    id: "convex-finance",
    typology: "Gambling",
    percentage: 33,
    platform: "Binance",
    coins: 3.081915,
    keyElement: "b6186943-dd6b-48c8-a109-eed89216a155",
  },
];

export const usePersonalCoins = () => {
  const [personalCoins, setPersonalCoins] = useState<PersonalCoins>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPersonalCoins(tempCoins);
      setLoading(false);
    }, 1000);
  }, [setPersonalCoins, setLoading]);

  return { personalCoins, setPersonalCoins, loading };
};
