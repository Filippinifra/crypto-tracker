import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";

const tempCoins: PersonalCoins = [
  {
    id: "terrausd",
    typologyId: "deb967d1-148e-4ea0-bcdc-052e85e686e9",
    percentage: 96,
    platform: "Anchor",
    coins: 1413,
    keyElement: "9b663bff-b733-4d88-a23f-f8b1b495c08a",
  },
  {
    id: "usd-coin",
    typologyId: "deb967d1-148e-4ea0-bcdc-052e85e686e9",
    percentage: 4,
    platform: "Ledn",
    coins: 684,
    keyElement: "8df659c2-0954-4026-8b0d-37b1de1e279b",
  },
  {
    id: "bitcoin",
    typologyId: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
    percentage: 50,
    platform: "Binance",
    coins: 0.01092773,
    keyElement: "ccc16a6c-87e9-4337-ae72-e441a0428ba3",
  },
  {
    id: "ethereum",
    typologyId: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
    percentage: 24,
    platform: "Binance",
    coins: 0.12814528,
    keyElement: "8ffa84c2-8acd-4bfa-a45d-afef054b81c0",
  },
  {
    id: "ethereum",
    typologyId: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
    percentage: 6,
    platform: "Metamask",
    coins: 0.0415,
    keyElement: "3e06b3cd-2cc2-4e4a-ba33-76a28a4b73fc",
  },
  {
    id: "binance-eth",
    typologyId: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
    percentage: 20,
    platform: "Binance",
    coins: 0.05538937,
    keyElement: "807e6785-4863-4c4a-9290-14996bb156eb",
  },
  {
    id: "solana",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Binance",
    coins: 1.0299,
    keyElement: "fde1ea29-a0de-4a73-a4a0-f11b5eeadd0a",
  },
  {
    id: "terra-luna",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Terra Station",
    coins: 2,
    keyElement: "161ead96-a947-425e-a5d0-3ba28ba9d3a8",
  },
  {
    id: "polkadot",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Binance",
    coins: 7.35394401,
    keyElement: "cba52b68-4140-43e6-aa6c-a9803051a84d",
  },
  {
    id: "binancecoin",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Binance",
    coins: 0.25146373,
    keyElement: "8131b112-81d7-4d6d-9d07-44f916b11fd4",
  },
  {
    id: "avalanche-2",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 10,
    platform: "Binance",
    coins: 0.7838337,
    keyElement: "ba5a7fee-064c-4948-bf44-37dafe2e3c69",
  },
  {
    id: "matic-network",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 10,
    platform: "Binance",
    coins: 36.22041551,
    keyElement: "e3672492-5ab8-4d07-b139-866ffbd9fd12",
  },
  {
    id: "crypto-com-chain",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 9,
    platform: "crypto.com",
    coins: 174,
    keyElement: "e9bb7f3f-dc5d-4652-9708-667f5f76b94d",
  },
  {
    id: "algorand",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 9,
    platform: "Binance",
    coins: 53.70874891,
    keyElement: "2559ead8-eb09-4ffa-87c9-b12576e15add",
  },
  {
    id: "cosmos",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 10,
    platform: "Binance",
    coins: 1.83816,
    keyElement: "983f9f8e-037c-4284-9853-fa4bed8011fa",
  },
  {
    id: "fantom",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 10,
    platform: "Binance",
    coins: 39.98253579,
    keyElement: "eefe5898-4eda-46e5-a244-2d90f2f0d0a6",
  },
  {
    id: "tezos",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 10,
    platform: "Binance",
    coins: 15.12292975,
    keyElement: "9a8a9773-3963-48e3-8ef2-da2a837b8624",
  },
  {
    id: "stellar",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 9,
    platform: "Binance",
    coins: 250.71603237,
    keyElement: "9ba60408-c2d2-4a3f-a6a6-41e7b8a62787",
  },
  {
    id: "decentraland",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 5,
    platform: "Binance",
    coins: 10.31603183,
    keyElement: "6bb111d0-0756-4cd0-8cbd-50f5910a904d",
  },
  {
    id: "aave",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 9,
    platform: "Binance",
    coins: 0.42551176,
    keyElement: "0b329a7b-d165-4cf1-9f45-de4d1752eb51",
  },
  {
    id: "ftx-token",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 9,
    platform: "Binance",
    coins: 1.2987,
    keyElement: "00780d5b-e37c-4da4-ab54-f33122e0762a",
  },
  {
    id: "bitdao",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 17,
    platform: "Bybit",
    coins: 37.4,
    keyElement: "4310c807-d23f-40a5-8b51-ff970550e82f",
  },
  {
    id: "oasis-network",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 16,
    platform: "Binance",
    coins: 164.835,
    keyElement: "fac301bd-39bd-4609-957a-6aef2683dffc",
  },
  {
    id: "loopring",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 17,
    platform: "Binance",
    coins: 65.95485186,
    keyElement: "208059ce-0743-430f-8ab5-a4eab29ecb0f",
  },
  {
    id: "audius",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 17,
    platform: "Binance",
    coins: 59.27090064,
    keyElement: "18d3d362-2cf5-4e31-a24c-ff25991a92ae",
  },
  {
    id: "chromaway",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 17,
    platform: "Binance",
    coins: 106.64156523,
    keyElement: "c79f93c1-3fdb-4722-a231-d2dc6b91d89e",
  },
  {
    id: "bitpanda-ecosystem-token",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 16,
    platform: "Bitpanda",
    coins: 63.45,
    keyElement: "bd8109a6-57c2-4248-8adb-913d77e1aecb",
  },
  {
    id: "insure",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 23,
    platform: "Metamask",
    coins: 8802,
    keyElement: "818c0ef8-1f46-4aa0-a47b-a772eb9d034b",
  },
  {
    id: "genie-protocol",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 5,
    platform: "Metamask",
    coins: 33.1,
    keyElement: "e3d046e4-f201-495e-a81b-0cd34599a43b",
  },
  {
    id: "tokemak",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 24,
    platform: "Mexc",
    coins: 2.08,
    keyElement: "fd570449-15a0-4f04-bb19-238cf785e07e",
  },
  {
    id: "curve-dao-token",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 24,
    platform: "Binance",
    coins: 21.94541198,
    keyElement: "cf0d4c42-f802-4cb7-81d7-0f7be9b5ddaf",
  },
  {
    id: "convex-finance",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 24,
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
