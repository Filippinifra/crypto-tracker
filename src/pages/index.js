import { Dropdown } from "components/Dropdown";
import { useMyCoins } from "hooks/useMyCoins";
import { Layout } from "components/Layout";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { useDataCoins } from "hooks/useDataCoins";
import { GridCoins } from "components/GridCoins";
import { GridWallet } from "components/GridWallet";

export async function getStaticProps() {
  let res = null;

  try {
    res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  } catch (e) {
    console.log(["error", e]);
  }

  const prices = res ? await res.json() : null;

  return {
    props: {
      prices,
    },
    revalidate: 120,
  };
}

export default function Home({ prices }) {
  const { coins, setCoins, loading } = useMyCoins();
  const { data } = useDataCoins(coins);

  const addCoin = (coin) => {
    const coinAlreadyExists = coins.some((existingCoin) => existingCoin.id === coin.id);
    if (!coinAlreadyExists) {
      setCoins((coins) => [...coins, coin]);
    }
  };

  const options = prices?.map(({ id, symbol, name }) => ({ value: { id, symbol, name }, label: `${symbol.toUpperCase()} // ${name} // ${id}` }));

  return (
    <LoadErrorHandler data={coins} error={!coins && !loading}>
      <Layout>
        <Typography variant="body">Aggiungi le tue coins:</Typography>
        <Spacer size={10} />
        <Dropdown
          value={null}
          options={options}
          onChange={(e) => {
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
