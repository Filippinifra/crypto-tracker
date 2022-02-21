import { useRouter } from "next/router";

export default function Home({ prices }) {
  const btc = prices.find(({ currency }) => currency === "BTC");
  const btcPrice = btc.price;

  const router = useRouter();

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
  const res = await fetch(`https://api.nomics.com/v1/prices?key=${FETCHING_SERVICE_API_KEY}`);
  const prices = await res.json();

  return {
    props: {
      prices,
    },
    revalidate: 60,
  };
}
