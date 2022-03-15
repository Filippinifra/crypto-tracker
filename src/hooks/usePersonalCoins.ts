import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";

const tempCoins: PersonalCoins = [
  {
    id: "terrausd",
    typologyId: "deb967d1-148e-4ea0-bcdc-052e85e686e9",
    percentage: 50,
    platform: "Anchor",
    coins: 3272.5,
    keyElement: "9b663bff-b733-4d88-a23f-f8b1b495c08a",
  },
  {
    id: "usd-coin",
    typologyId: "deb967d1-148e-4ea0-bcdc-052e85e686e9",
    percentage: 50,
    platform: "Ledn",
    coins: 129.6,
    keyElement: "8df659c2-0954-4026-8b0d-37b1de1e279b",
  },
  {
    id: "bitcoin",
    typologyId: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
    percentage: 50,
    platform: "Binance",
    coins: 0.02092773,
    keyElement: "ccc16a6c-87e9-4337-ae72-e441a0428ba3",
  },
  {
    id: "ethereum",
    typologyId: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
    percentage: 50,
    platform: "Binance",
    coins: 0.21814528,
    keyElement: "8ffa84c2-8acd-4bfa-a45d-afef054b81c0",
  },
  {
    id: "solana",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 50,
    platform: "Binance",
    coins: 1.0299,
    keyElement: "fde1ea29-a0de-4a73-a4a0-f11b5eeadd0a",
  },
  {
    id: "terra-luna",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Terra Station",
    coins: 5,
    keyElement: "161ead96-a947-425e-a5d0-3ba28ba9d3a8",
  },
  {
    id: "polkadot",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Binance",
    coins: 10.35394401,
    keyElement: "cba52b68-4140-43e6-aa6c-a9803051a84d",
  },
  {
    id: "binancecoin",
    typologyId: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
    percentage: 25,
    platform: "Binance",
    coins: 0.55146373,
    keyElement: "8131b112-81d7-4d6d-9d07-44f916b11fd4",
  },
  {
    id: "avalanche-2",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 30,
    platform: "Binance",
    coins: 0.7838337,
    keyElement: "ba5a7fee-064c-4948-bf44-37dafe2e3c69",
  },
  {
    id: "matic-network",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 30,
    platform: "Binance",
    coins: 36.22041551,
    keyElement: "e3672492-5ab8-4d07-b139-866ffbd9fd12",
  },
  {
    id: "fantom",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 20,
    platform: "Binance",
    coins: 39.98253579,
    keyElement: "eefe5898-4eda-46e5-a244-2d90f2f0d0a6",
  },
  {
    id: "tezos",
    typologyId: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
    percentage: 20,
    platform: "Binance",
    coins: 15.12292975,
    keyElement: "9a8a9773-3963-48e3-8ef2-da2a837b8624",
  },
  {
    id: "oasis-network",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 25,
    platform: "Binance",
    coins: 164.835,
    keyElement: "fac301bd-39bd-4609-957a-6aef2683dffc",
  },
  {
    id: "audius",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 25,
    platform: "Binance",
    coins: 59.27090064,
    keyElement: "18d3d362-2cf5-4e31-a24c-ff25991a92ae",
  },
  {
    id: "chromaway",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 25,
    platform: "Binance",
    coins: 106.64156523,
    keyElement: "c79f93c1-3fdb-4722-a231-d2dc6b91d89e",
  },
  {
    id: "bitpanda-ecosystem-token",
    typologyId: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
    percentage: 25,
    platform: "Bitpanda",
    coins: 63.45,
    keyElement: "bd8109a6-57c2-4248-8adb-913d77e1aecb",
  },
  {
    id: "tokemak",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 34,
    platform: "Mexc",
    coins: 2.08,
    keyElement: "fd570449-15a0-4f04-bb19-238cf785e07e",
  },
  {
    id: "curve-dao-token",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
    percentage: 33,
    platform: "Binance",
    coins: 21.94541198,
    keyElement: "cf0d4c42-f802-4cb7-81d7-0f7be9b5ddaf",
  },
  {
    id: "convex-finance",
    typologyId: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
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
