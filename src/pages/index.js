import { useRouter } from "next/router";
import { FETCHING_SERVICE_API_KEY } from "utils/api";

export async function getStaticProps() {
  let res = null;

  try {
    res = await fetch(`https://api.nomics.com/v1/prices?key=${FETCHING_SERVICE_API_KEY}`);
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
  const router = useRouter();

  if (!prices) {
    return <div>No data!!</div>;
  }

  const btc = prices.find(({ currency }) => currency === "BTC");
  const btcPrice = btc.price;

  const refreshData = () => {
    router.reload(window.location.pathname);
  };

  return (
    <div>
      <div>{`hello, this is BTC price: ${btcPrice}`}</div>
      <button onClick={refreshData}>Refresh</button>
    </div>
  );
}
