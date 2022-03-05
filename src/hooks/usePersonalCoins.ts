import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";

const tempCoins: PersonalCoins = [
  { id: "convex-finance", typology: "Gambling", percentage: 24, platform: "Binance", coins: 2.22 },
  { id: "curve-dao-token", typology: "Gambling", percentage: 24, platform: "Binance", coins: 21.945 },
  { id: "tokemak", typology: "Gambling", percentage: 24, platform: "Mexc", coins: 2.08 },
  { id: "genie-protocol", typology: "Gambling", percentage: 5, platform: "Metamask", coins: 33.1 },
  { id: "insure", typology: "Gambling", percentage: 23, platform: "Metamask", coins: 19482 },
  { id: "bitpanda-ecosystem-token", typology: "Low cap", percentage: 16, platform: "Bitpanda", coins: 63.45 },
  { id: "chromaway", typology: "Low cap", percentage: 17, platform: "Binance", coins: 106.6 },
  { id: "audius", typology: "Low cap", percentage: 17, platform: "Binance", coins: 59.27 },
  { id: "loopring", typology: "Low cap", percentage: 17, platform: "Binance", coins: 65.945 },
  { id: "oasis-network", typology: "Low cap", percentage: 16, platform: "Binance", coins: 164.835 },
  { id: "bitdao", typology: "Low cap", percentage: 17, platform: "Bybit", coins: 37.4 },
  { id: "ftx-token", typology: "Mid cap", percentage: 9, platform: "Binance", coins: 1.2987 },
  { id: "aave", typology: "Mid cap", percentage: 9, platform: "Binance", coins: 0.165 },
  { id: "decentraland", typology: "Mid cap", percentage: 5, platform: "Binance", coins: 10.31 },
  { id: "stellar", typology: "Mid cap", percentage: 9, platform: "Binance", coins: 250.68 },
  { id: "tezos", typology: "Mid cap", percentage: 10, platform: "Binance", coins: 15.119 },
  { id: "fantom", typology: "Mid cap", percentage: 10, platform: "Binance", coins: 26.9877 },
  { id: "cosmos", typology: "Mid cap", percentage: 10, platform: "Binance", coins: 1.838 },
  { id: "algorand", typology: "Mid cap", percentage: 9, platform: "Binance", coins: 53.69 },
  { id: "crypto-com-chain", typology: "Mid cap", percentage: 9, platform: "crypto.com", coins: 174 },
  { id: "matic-network", typology: "Mid cap", percentage: 10, platform: "Binance", coins: 36.15 },
  { id: "avalanche-2", typology: "Mid cap", percentage: 10, platform: "Binance", coins: 0.783 },
  { id: "binancecoin", typology: "High cap", percentage: 25, platform: "Binance", coins: 0.5188 },
  { id: "polkadot", typology: "High cap", percentage: 25, platform: "Binance", coins: 10.35 },
  { id: "terra-luna", typology: "High cap", percentage: 25, platform: "Terra Station", coins: 5 },
  { id: "solana", typology: "High cap", percentage: 25, platform: "Binance", coins: 1.2 },
  { id: "binance-eth", typology: "Bigs", percentage: 9, platform: "Binance", coins: 0.055 },
  { id: "ethereum", typology: "Bigs", percentage: 7, platform: "Metamask", coins: 0.041 },
  { id: "ethereum", typology: "Bigs", percentage: 34, platform: "Binance", coins: 0.1288 },
  { id: "bitcoin", typology: "Bigs", percentage: 50, platform: "Binance", coins: 0.0176 },
  { id: "usd-coin", typology: "Liquidity", percentage: 4, platform: "Ledn", coins: 128.7 },
  { id: "terrausd", typology: "Liquidity", percentage: 96, platform: "Anchor", coins: 3137 },
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
