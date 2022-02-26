import { CoinsDropdown } from "components/CoinsDropdown";
import { usePersonalCoins } from "hooks/useMyCoins";
import { Layout } from "components/Layout";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { useDetailedCoins } from "hooks/useDataCoins";
import { GridWallet } from "components/GridWallet";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GridCoins } from "components/GridCoins";
import { AvailableCoins } from "types/availableCoins";

export const getStaticProps: GetStaticProps<{ availableCoins: AvailableCoins | undefined }> = async () => {
  let res = null;

  try {
    res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  } catch (e) {
    console.log(["error", e]);
  }

  const availableCoins: AvailableCoins | undefined = res ? await res.json() : null;

  return {
    props: {
      availableCoins,
    },
    revalidate: 120,
  };
};

export default function Home({ availableCoins }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { coins, setCoins, loading } = usePersonalCoins();
  const { data } = useDetailedCoins(coins);

  const addCoin = (coin: any) => {
    const coinAlreadyExists = coins?.some((existingCoin: any) => existingCoin.id === coin.id);
    if (!coinAlreadyExists) {
      setCoins((coins: any) => [...coins, coin]);
    }
  };

  const options = availableCoins?.map((value) => ({ value, label: `${value.symbol.toUpperCase()} // ${value.name} // ${value.id}` }));

  return (
    <LoadErrorHandler data={coins} error={!coins && !loading}>
      <Layout>
        <Typography variant="body">Aggiungi le tue coins:</Typography>
        <Spacer size={10} />
        <CoinsDropdown
          value={null}
          options={options}
          onChange={(e: { value: any }) => {
            addCoin(e.value);
          }}
        />
        <Spacer size={20} />
        {/* <GridWallet /> */}
        <GridCoins data={data || []} />
      </Layout>
    </LoadErrorHandler>
  );
}
