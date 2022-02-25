import { Dropdown } from "components/Dropdown";
import { useMyCoins } from "hooks/useMyCoins";
import { pricesCoin } from "utils/api";
import { Layout } from "components/Layout";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";

export async function getStaticProps() {
  let res = null;

  try {
    res = await fetch(pricesCoin);
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

  const addCoin = (coin) => {
    const coinAlreadyExists = coins.some((existingCoin) => existingCoin.currency === coin.currency);
    if (!coinAlreadyExists) {
      setCoins((coins) => [...coins, coin]);
    }
  };

  const options = prices.map(({ currency, price }) => ({ value: { currency, price }, label: `${currency} - ${price}$` }));

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
        <div>
          {coins?.map((coin) => {
            return <div key={coin.currency}>{coin.currency}</div>;
          })}
        </div>
      </Layout>
    </LoadErrorHandler>
  );
}
