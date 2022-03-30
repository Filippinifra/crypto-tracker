import { useToast } from "hooks/useToast";
import { Currency, getNameForCurrency } from "types/currency";
import useSWR from "swr";
import { PersonalCoins } from "types/personalCoins";
import { DetailedCoinsDTO } from "types/api/detailedCoinsAPI";
import { useEffect, useState } from "react";
import { toDetailedCoin } from "mappers/toDetailedCoins";

const fetcher = (options: any) => fetch(options).then((res) => res.json());

export const useDetailedCoins = (coins: PersonalCoins | undefined, prefCurrency: Currency | undefined) => {
  const { data, mutate, error } = useSWR<DetailedCoinsDTO>(
    coins?.length && prefCurrency !== undefined ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${getNameForCurrency(prefCurrency)}&ids=${coins.map(({ id }) => id).join(",")}` : null,
    fetcher
  );

  const { showToast } = useToast();

  const [previousData, setPreviousData] = useState<DetailedCoinsDTO>();

  const onMutate = async () => {
    const newData = await mutate();

    if (JSON.stringify(newData) !== JSON.stringify(previousData)) {
      showToast("I prezzi sono stati aggiornati", "success");
      setPreviousData(newData);
    } else {
      showToast("I prezzi sono già aggiornati", "warning");
    }
  };

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(previousData)) {
      setPreviousData(data);
    }
  }, [data, setPreviousData]);

  return { detailedCoins: data ? toDetailedCoin(data) : null, mutate: onMutate, error, loading: Boolean(coins?.length && !data && !error) };
};
