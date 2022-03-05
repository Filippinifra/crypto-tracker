import { Currency } from "types/currency";
import { useEffect, useState } from "react";

const tempPrefCurrency: Currency = Currency.EUR;

export const usePrefCurrency = () => {
  const [prefCurrency, setPrefCurrency] = useState<Currency>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPrefCurrency(tempPrefCurrency);
      setLoading(false);
    }, 1000);
  }, [setPrefCurrency, setLoading]);

  return { prefCurrency, setPrefCurrency, loading };
};
