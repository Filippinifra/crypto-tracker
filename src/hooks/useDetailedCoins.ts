import { useToast } from "contexts/ToastContext";
import { Currency, getNameForCurrency } from "types/currency";
import useSWR from "swr";
import { PersonalCoins } from "types/personalCoins";
import { DetailedCoinsAPI } from "types/api/detailedCoinsAPI";
import { toDetailedCoin } from "utils/coins";
import { useEffect, useState } from "react";

const fetcher = (options: any) => fetch(options).then((res) => res.json());

export const useDetailedCoins = (coins: PersonalCoins | undefined, prefCurrency: Currency | undefined) => {
  const { data, mutate, error } = useSWR<DetailedCoinsAPI>(
    coins?.length && prefCurrency !== undefined ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${getNameForCurrency(prefCurrency)}&ids=${coins.map(({ id }) => id).join(",")}` : null,
    fetcher
  );

  const { showToast } = useToast();

  const [previousData, setPreviousData] = useState<DetailedCoinsAPI>();

  const onMutate = async () => {
    const newData = await mutate();

    if (JSON.stringify(newData) !== JSON.stringify(previousData)) {
      showToast("I dati sono stati ricaricati", "success");
      setPreviousData(newData);
    } else {
      showToast("I dati sono già aggiornati", "warning");
    }
  };

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(previousData)) {
      setPreviousData(data);
    }
  }, [data, setPreviousData]);

  return { detailedCoins: data ? toDetailedCoin(data) : null, mutate: onMutate, error, loading: !data && !error };
};
