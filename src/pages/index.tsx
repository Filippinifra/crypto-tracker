import { CoinsDropdown } from "components/CoinsDropdown";
import { usePersonalCoins } from "hooks/usePersonalCoins";
import { Layout } from "components/Layout";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { useDetailedCoins } from "hooks/useDetailedCoins";
import { GridWallet } from "components/GridWallet";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GridCoins } from "components/GridCoins";
import { AvailableCoins } from "types/availableCoins";
import { useWallet } from "hooks/useWallet";
import { useTotalVest } from "hooks/useTotalVest";
import { VestSummary } from "components/VestSummary";
import { PieChart } from "components/PieChart";

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

const pieColor = ["#F1948A", "#BB8FCE", "#85C1E9", "#73C6B6", "#82E0AA", "#F8C471", "#E59866", "#D98880", "#C39BD3", "#7FB3D5", "#76D7C4", "#7DCEA0", "#F7DC6F", "#F0B27A"];
const pieColorDark = ["#E74C3C", "#8E44AD", "#3498DB", "#16A085", "#2ECC71", "#F39C12", "#D35400", "#C0392B", "#9B59B6", "#2980B9", "#1ABC9C", "#27AE60", "#F1C40F", "#E67E22"];

export default function Home({ availableCoins }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { personalCoins, setPersonalCoins, loading: coinsLoading } = usePersonalCoins();
  const { detailedCoins } = useDetailedCoins(personalCoins);
  const { wallet, setWallet, loading: walletLoading } = useWallet();
  const { totalVest, setTotalVest, loading: totalVestLoading } = useTotalVest();

  const addCoin = (coin: any) => {
    const coinAlreadyExists = personalCoins?.some((existingCoin: any) => existingCoin.id === coin.id);
    if (!coinAlreadyExists) {
      setPersonalCoins((coins: any) => [...coins, coin]);
    }
  };

  const options = availableCoins?.map((value) => ({ value, label: `${value.symbol.toUpperCase()} // ${value.name} // ${value.id}` }));

  const error = !personalCoins && !coinsLoading && !wallet && !walletLoading && !totalVest && !totalVestLoading;

  const sumFiatValue = 900;

  const dataChart = {
    labels: wallet?.map(({ typology }) => typology),
    datasets: [
      {
        label: "Tipologie portafoglio",
        data: wallet?.map(({ percentage }) => percentage),
        backgroundColor: pieColor,
        borderColor: pieColorDark,
        borderWidth: 1,
      },
    ],
  };

  return (
    <LoadErrorHandler data={personalCoins && wallet && totalVest} error={error}>
      <Layout>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 150 }}>
            <VestSummary totalVest={totalVest || 0} sumFiatValue={sumFiatValue || 0} />
            <Spacer size={30} />
            <div style={{ height: "auto" }}>
              <GridWallet wallet={wallet || []} sumFiatValue={sumFiatValue || 0} />
            </div>
          </div>
          <PieChart data={dataChart} />
        </div>
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
