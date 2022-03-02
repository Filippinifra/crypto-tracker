import { Currency, getNameForCurrency } from "types/currency";
import useSWR from "swr";
import { DetailedCoins } from "types/detailedCoins";
import { PersonalCoins } from "types/personalCoins";

const fetcher = (options: any) => fetch(options).then((res) => res.json());

export const useDetailedCoins = (coins: PersonalCoins | undefined, prefCurrency: Currency | undefined) => {
  const { data } = useSWR<DetailedCoins>(
    coins?.length && prefCurrency !== undefined ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${getNameForCurrency(prefCurrency)}&ids=${coins.map(({ id }) => id).join(",")}` : null,
    fetcher
  );

  return { detailedCoins: data };
};
