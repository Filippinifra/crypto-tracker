import { pieColorsDark } from "utils/colors";
import { WalletDivision } from "types/walletDivision";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const tempCoins: WalletDivision = [
  {
    typology: "Liquidity",
    percentage: 50,
    keyElement: "deb967d1-148e-4ea0-bcdc-052e85e686e9",
  },
  {
    typology: "Bigs",
    percentage: 25,
    keyElement: "09fb2a92-ff9d-4013-8506-0fc96adf1d6f",
  },
  {
    typology: "High cap",
    percentage: 10,
    keyElement: "864b535f-f39a-42ed-a5ca-ecd6170a73f2",
  },
  {
    typology: "Mid cap",
    percentage: 8,
    keyElement: "2e18de78-7db1-42b3-8dba-9094689aaeb5",
  },
  {
    typology: "Low cap",
    percentage: 4,
    keyElement: "f5c213f7-6b1e-4ca3-a8f4-7b8e508076bd",
  },
  {
    typology: "Gambling",
    percentage: 3,
    keyElement: "ac34932d-ab2a-4f45-b0ea-e769b80bf96f",
  },
].map((e, i) => {
  return { ...e, color: pieColorsDark[i] };
});

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletDivision>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWallet(tempCoins);
      setLoading(false);
    }, 1000);
  }, [setWallet, setLoading]);

  return { wallet, setWallet, loading };
};
