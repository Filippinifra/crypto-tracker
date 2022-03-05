import { Currency, getNameForCurrency } from "types/currency";
import useSWR from "swr";
import { PersonalCoins } from "types/personalCoins";
import { DetailedCoinsAPI } from "types/api/detailedCoinsAPI";
import { toDetailedCoin } from "utils/coins";

const fetcher = (options: any) => fetch(options).then((res) => res.json());

export const useDetailedCoins = (coins: PersonalCoins | undefined, prefCurrency: Currency | undefined) => {
  const { data } = useSWR<DetailedCoinsAPI>(
    coins?.length && prefCurrency !== undefined ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${getNameForCurrency(prefCurrency)}&ids=${coins.map(({ id }) => id).join(",")}` : null,
    fetcher
  );

  return { detailedCoins: data ? toDetailedCoin(data) : null };
};
