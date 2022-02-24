import { Dropdown } from "components/Dropdown";
import { useMyCoins } from "hooks/useMyCoins";
import { useRouter } from "next/router";
import { Button } from "components/Button";
import { pricesCoin } from "utils/api";
import { Layout } from "components/Layout";

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
  const { coins, setCoins } = useMyCoins();

  if (!prices) {
    return <div>No data!!</div>;
  }

  const addCoin = (coin) => {
    const coinAlreadyExists = coins.some((existingCoin) => existingCoin.currency === coin.currency);
    if (!coinAlreadyExists) {
      setCoins((coins) => [...coins, coin]);
    }
  };

  const options = prices.map(({ currency, price }) => ({ value: { currency, price }, label: `${currency} - ${price}$` }));

  return (
    <Layout>
      <div>
        {coins.map((coin) => {
          return <div>{coin.currency}</div>;
        })}
      </div>

      <Dropdown
        value={null}
        options={options}
        onChange={(e) => {
          addCoin(e.value);
        }}
      />
    </Layout>
  );
}
