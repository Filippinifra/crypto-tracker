import { useEffect, useState } from "react";

const tempCoins = [
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

export const useMyCoins = () => {
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCoins(tempCoins);
      setLoading(false);
    }, 1000);
  }, [setCoins, setLoading]);

  return { coins, setCoins, loading };
};
