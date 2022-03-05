import { WalletDivision } from "types/walletDivision";
import { useEffect, useState } from "react";

const tempCoins: WalletDivision = [
  { typology: "Liquidity", percentage: 50 },
  { typology: "Bigs", percentage: 25 },
  { typology: "High cap", percentage: 10 },
  { typology: "Mid cap", percentage: 8 },
  { typology: "Low cap", percentage: 4 },
  { typology: "Gambling", percentage: 3 },
];

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
