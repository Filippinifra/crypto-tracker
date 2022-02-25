import { Dropdown } from "components/Dropdown";
import { useMyCoins } from "hooks/useMyCoins";
import { Layout } from "components/Layout";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { Grid } from "components/Grid";
import { useDataCoins } from "hooks/useDataCoins";

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

  console.log(data);

  const options = prices?.map(({ id, symbol, name }) => ({ value: { id, symbol, name }, label: `id: ${id} - symbol: ${symbol} - name: ${name}` }));

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
        <Grid
          templateColumns={"1fr 10fr 10fr 10fr 10fr"}
          data={data?.reduce((r, { symbol, name, image, current_price, price_change_percentage_24h }) => {
            return [
              ...r,
              <div style={{ backgroundColor: "white", height: 36 }}>
                <img src={image} style={{ height: 36 }} />
              </div>,
              ...[symbol, name, current_price, price_change_percentage_24h].map((value) => (
                <Typography variant="body" style={{ width: "100%", backgroundColor: "white", padding: 10, boxSizing: "border-box" }}>
                  {value}
                </Typography>
              )),
            ];
          }, [])}
        />
      </Layout>
    </LoadErrorHandler>
  );
}
