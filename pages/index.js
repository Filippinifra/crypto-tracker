import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ prices }) {
  const router = useRouter();

  if (!prices) {
    return <div>No data!!</div>;
  }

  const btc = prices.find(({ currency }) => currency === "BTC");
  const btcPrice = btc.price;

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div>
      <div>{`hello, this is BTC price: ${btcPrice}`}</div>
      <button onClick={refreshData}>Refresh</button>
    </div>
  );
}

const FETCHING_SERVICE_API_KEY = "3d170cf90f2902990ba061da9eb39d4d275e3bd3";

export async function getStaticProps() {
  let res = null;
  try {
    res = await fetch(`https://api.nomics.com/v1/prices?key=${FETCHING_SERVICE_API_KEY}`);
  } catch (e) {
    console.log(["error", e]);
  }

  console.log(JSON.stringify(res));

  const prices = res ? await res.json() : null;

  return {
    props: {
      prices,
    },
    revalidate: 60,
  };
}
