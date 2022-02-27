import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";

const tempCoins: PersonalCoins = [
  "convex-finance",
  "curve-dao-token",
  "tokemak",
  "genie-protocol",
  "insure",
  "bitpanda-ecosystem-token",
  "chromaway",
  "audius",
  "loopring",
  "oasis-network",
  "bitdao",
  "ftx-token",
  "aave",
  "decentraland",
  "stellar",
  "tezos",
  "fantom",
  "cosmos",
  "algorand",
  "crypto-com-chain",
  "matic-network",
  "avalanche-2",
  "binancecoin",
  "polkadot",
  "terra-luna",
  "solana",
  "binance-eth",
  "ethereum",
  "bitcoin",
  "usd-coin",
  "terrausd",
].map((e) => ({ id: e }));

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
