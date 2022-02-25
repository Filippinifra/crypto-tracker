import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useDataCoins = (coins) => {
  const { data, error } = useSWR(coins?.length ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.map(({ id }) => id).join(",")}` : null, fetcher);

  return { data };
};
