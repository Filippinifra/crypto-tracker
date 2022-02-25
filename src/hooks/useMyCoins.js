import { useEffect, useState } from "react";

export const useMyCoins = () => {
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCoins([{ abc: "ciao" }]);
      setLoading(false);
    }, 1000);
  }, [setCoins, setLoading]);

  return { coins, setCoins, loading };
};
