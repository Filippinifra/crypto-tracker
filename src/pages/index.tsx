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
import { DoughnutChart } from "components/DoughnutChart";
import { pieColors, pieColorsDark } from "utils/colors";
import { usePrefCurrency } from "hooks/usePrefCurrency";
import { Currency, getSymbolForCurrency } from "types/currency";
import { getCrossedCoins, toRebalancingCoins } from "utils/coins";
import { useMemo } from "react";

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
  const { personalCoins, setPersonalCoins, loading: coinsLoading } = usePersonalCoins();
  const { wallet, setWallet, loading: walletLoading } = useWallet();
  const { totalVest, setTotalVest, loading: totalVestLoading } = useTotalVest();
  const { prefCurrency, setPrefCurrency } = usePrefCurrency();
  const { detailedCoins } = useDetailedCoins(personalCoins, prefCurrency);

  const addCoin = (coin: any) => {
    const coinAlreadyExists = personalCoins?.some((existingCoin: any) => existingCoin.id === coin.id);
    if (!coinAlreadyExists) {
      setPersonalCoins((coins: any) => [...coins, coin]);
    }
  };

  const options = availableCoins?.map((value) => ({ value, label: `${value.symbol.toUpperCase()} // ${value.name} // ${value.id}` }));

  const crossedCoins = useMemo(() => getCrossedCoins(personalCoins || [], detailedCoins || []), [personalCoins, detailedCoins]);

  const sumFiatValue = crossedCoins?.reduce((r, { currentPrice, coins }) => r + (currentPrice || 0) * coins, 0);

  const dataChart = {
    labels: wallet?.map(({ typology }) => typology),
    datasets: [
      {
        label: "Tipologie portafoglio",
        data: wallet?.map(({ percentage }) => percentage),
        backgroundColor: pieColors,
        borderColor: pieColorsDark,
        borderWidth: 2,
      },
    ],
  };

  const data = personalCoins && wallet && totalVest;
  const error = !personalCoins && !coinsLoading && !wallet && !walletLoading && !totalVest && !totalVestLoading;

  const symbolCurrency = getSymbolForCurrency(prefCurrency || Currency.EUR) || "€";

  const rebalancingCoins = toRebalancingCoins(crossedCoins, wallet || [], sumFiatValue);

  return (
    <LoadErrorHandler data={data} error={error}>
      <Layout prefCurrency={prefCurrency} setPrefCurrency={setPrefCurrency}>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 150 }}>
            <VestSummary totalVest={totalVest || 0} sumFiatValue={sumFiatValue || 0} symbolCurrency={symbolCurrency} />
            <Spacer size={30} />
            <div style={{ height: "auto" }}>
              <GridWallet wallet={wallet || []} sumFiatValue={sumFiatValue || 0} symbolCurrency={symbolCurrency} />
            </div>
          </div>
          <DoughnutChart data={dataChart} />
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
        <GridCoins rebalancingCoins={rebalancingCoins} wallet={wallet || []} symbolCurrency={symbolCurrency} />
      </Layout>
    </LoadErrorHandler>
  );
}
