import { useEffect, useState } from "react";

export const useMyCoins = () => {
  const [coins, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);

  return { coins, setCoins, loading };
};
