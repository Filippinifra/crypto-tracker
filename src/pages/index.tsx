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
import { useWallet } from "hooks/useWallet";

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
  const { coins, setCoins, loading: coinsLoading } = usePersonalCoins();
  const { detailedCoins } = useDetailedCoins(coins);
  const { wallet, setWallet, loading: walletLoading } = useWallet();

  const addCoin = (coin: any) => {
    const coinAlreadyExists = coins?.some((existingCoin: any) => existingCoin.id === coin.id);
    if (!coinAlreadyExists) {
      setCoins((coins: any) => [...coins, coin]);
    }
  };

  const options = availableCoins?.map((value) => ({ value, label: `${value.symbol.toUpperCase()} // ${value.name} // ${value.id}` }));

  return (
    <LoadErrorHandler data={coins && wallet} error={!coins && !coinsLoading && !wallet && !walletLoading}>
      <Layout>
        <GridWallet wallet={wallet || []} />
        <Spacer size={30} />
        <Typography variant="body">Aggiungi le tue coins:</Typography>
        <Spacer size={10} />
        <div style={{ width: 600 }}>
          <CoinsDropdown
            value={null}
            options={options}
            onChange={(e: { value: any }) => {
              addCoin(e.value);
            }}
          />
        </div>
        <Spacer size={30} />
        <GridCoins data={detailedCoins || []} />
      </Layout>
    </LoadErrorHandler>
  );
}
