import { useEffect, useState } from "react";

export const useMyCoins = () => {
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCoins([{ id: "bitcoin" }, { id: "ethereum" }]);
      setLoading(false);
    }, 1000);
  }, [setCoins, setLoading]);

  return { coins, setCoins, loading };
};
