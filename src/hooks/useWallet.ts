import { WalletDivision } from "types/walletDivision";
import { useEffect, useState } from "react";

const tempCoins: WalletDivision = [
  { typology: "Liquidity", percentage: 40 },
  { typology: "Bigs", percentage: 25 },
  { typology: "Alt cap", percentage: 10 },
  { typology: "Mid cap", percentage: 15 },
  { typology: "Low cap", percentage: 10 },
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
