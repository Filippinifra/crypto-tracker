import { ApiResponse } from "./../types/apiResponse";
import useSWR from "swr";
import { DetailedCoins } from "types/detailedCoins";
import { PersonalCoins } from "types/personalCoins";

const fetcher = (options: any) => fetch(options).then((res) => res.json());

export const useDetailedCoins = (coins: PersonalCoins | undefined) => {
  const { data } = useSWR<DetailedCoins>(coins?.length ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.map(({ id }) => id).join(",")}` : null, fetcher);

  return { detailedCoins: data };
};
