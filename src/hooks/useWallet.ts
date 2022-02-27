import { WalletDivision } from "types/walletDivision";
import { useEffect, useState } from "react";

const tempCoins: WalletDivision = [
  { typology: "Liquidity", percentage: 40, value: 1200 },
  { typology: "Bigs", percentage: 25, value: 750 },
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
