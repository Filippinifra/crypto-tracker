import { useEffect, useState } from "react";
import { TotalVest } from "types/totalVest";

const tempTotalVest: TotalVest = 7420;

export const useTotalVest = () => {
  const [totalVest, setTotalVest] = useState<TotalVest>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTotalVest(tempTotalVest);
      setLoading(false);
    }, 1000);
  }, [setTotalVest, setLoading]);

  return { totalVest, setTotalVest, loading };
};
