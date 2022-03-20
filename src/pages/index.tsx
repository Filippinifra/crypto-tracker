import { CoinsDropdown } from "components/CoinsDropdown";
import { usePersonalCoins } from "hooks/usePersonalCoins";
import { Layout } from "components/Layout";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { useDetailedCoins } from "hooks/useDetailedCoins";
import { GridWalletPanel } from "components/GridWalletPanel";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GridCoinsPanel } from "components/GridCoinsPanel";
import { AvailableCoin, AvailableCoins } from "types/availableCoins";
import { useWallet } from "hooks/useWallet";
import { useTotalVest } from "hooks/useTotalVest";
import { VestSummaryPanel } from "components/VestSummaryPanel";
import { DoughnutChart } from "components/DoughnutChart";
import { pieColors, pieColorsDark } from "utils/colors";
import { usePrefCurrency } from "hooks/usePrefCurrency";
import { Currency, getSymbolForCurrency } from "types/currency";
import { getCrossedCoins, toRebalancingCoins } from "utils/coins";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RebalancingCoins } from "types/rebalancingCoins";
import { PersonalCoin } from "types/personalCoins";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "hooks/useToast";
import { RoutesHandler } from "components/RoutesHandler";
import { useResponsive } from "hooks/useResponsive";

export const getStaticProps: GetStaticProps<{ availableCoins: AvailableCoins | undefined }> = async () => {
  let res = null;

  try {
    res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  } catch (e) {
    console.log(["Error on fetching coinjecko api", e]);
  }

  const availableCoins: AvailableCoins | undefined = res ? await res.json() : null;

  return {
    props: {
      availableCoins,
    },
    revalidate: 120,
  };
};

const Home = ({ availableCoins }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { personalCoins, setPersonalCoins, loading: coinsLoading } = usePersonalCoins();
  const { wallet, setWallet, loading: walletLoading } = useWallet();
  const { totalVest, setTotalVest, loading: totalVestLoading } = useTotalVest();
  const { prefCurrency, setPrefCurrency } = usePrefCurrency();
  const { detailedCoins, error: detailedCoinsError, loading: detailedCoinsLoading } = useDetailedCoins(personalCoins, prefCurrency);
  const { getResponsiveValue } = useResponsive();
  const [isEditingGridCoins, setEditingGridCoins] = useState(false);

  const { showToast } = useToast();

  const addCoin = (coin: AvailableCoin) => {
    const keyElement = uuidv4();
    const newCoin: PersonalCoin = { coins: 0, id: coin.id, keyElement, percentage: 0, platform: "", typologyId: "" };
    setPersonalCoins((coins) => (coins ? [...coins, newCoin] : [newCoin]));
    showToast("Nuova moneta aggiunta", "success");
  };

  const options = availableCoins?.filter(({ id }) => id).map((value) => ({ value, label: `${value.symbol.toUpperCase()} // ${value.name} // ${value.id}` }));

  const crossedCoins = useMemo(() => getCrossedCoins(personalCoins || [], detailedCoins || []), [personalCoins, detailedCoins]);

  const sumFiatValue = crossedCoins?.reduce((r, { currentPrice, coins }) => r + (currentPrice || 0) * coins, 0);

  const dataChart = {
    labels: wallet?.map(({ typologyName }) => typologyName),
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
  const error = !personalCoins && !coinsLoading && !wallet && !walletLoading && !totalVest && !totalVestLoading && !detailedCoinsError;

  const symbolCurrency = getSymbolForCurrency(prefCurrency || Currency.EUR) || "€";

  const rebalancingCoins = toRebalancingCoins(crossedCoins, wallet || [], sumFiatValue);

  const onSetRebalancingCoins = (rebalancingCoins: RebalancingCoins) => {
    setPersonalCoins(
      rebalancingCoins.map(({ coins, id, keyElement, allocationPercentage, platform, typologyId }) => ({ coins, id, keyElement, percentage: allocationPercentage, platform, typologyId }))
    );
  };

  const removesNotExistingTypologyId = useCallback(() => {
    const result = personalCoins?.map((pc) => {
      const isTypologyIdExising = Boolean(wallet?.some(({ typologyId }) => typologyId === pc.typologyId));

      return isTypologyIdExising ? pc : { ...pc, typologyId: "" };
    });

    if (wallet && JSON.stringify(personalCoins) !== JSON.stringify(result)) {
      setPersonalCoins(result);
      showToast("Le monete assegnate a tipologie che sono state rimosse ora hanno una tipologia vuota", "warning");
    }
  }, [personalCoins, wallet, setPersonalCoins, showToast]);

  useEffect(() => {
    removesNotExistingTypologyId();

    return () => removesNotExistingTypologyId();
  }, [wallet, removesNotExistingTypologyId]);

  return (
    <RoutesHandler>
      <LoadErrorHandler data={data} error={error}>
        <Layout prefCurrency={prefCurrency || Currency.EUR} setPrefCurrency={setPrefCurrency} personalCoins={personalCoins || []}>
          <div style={{ display: "flex", flexDirection: getResponsiveValue(["column", "column", "row"]), alignItems: getResponsiveValue(["center", "center", ""]) }}>
            <div style={{ marginRight: getResponsiveValue([0, 0, 150]), ...(getResponsiveValue([true, false, false]) && { width: "100%" }) }}>
              <VestSummaryPanel totalVest={totalVest || 0} setTotalVest={setTotalVest} sumFiatValue={sumFiatValue || 0} symbolCurrency={symbolCurrency} />
              <Spacer size={40} />
              <div style={{ height: "auto" }}>
                <GridWalletPanel wallet={wallet || []} setWallet={setWallet} sumFiatValue={sumFiatValue || 0} symbolCurrency={symbolCurrency} />
              </div>
            </div>
            {getResponsiveValue([true, true, false]) && <Spacer size={40} />}
            <DoughnutChart data={dataChart} />
          </div>
          <Spacer size={50} />
          <Typography variant="body">Aggiungi le tue coins:</Typography>
          <Spacer size={20} />
          <div style={{ width: getResponsiveValue(["auto", "100%", "600px"]), margin: 6 }}>
            <CoinsDropdown
              value={null}
              options={options}
              onChange={(e: { value: AvailableCoin }) => {
                addCoin(e.value);
              }}
              isDisabled={isEditingGridCoins}
            />
          </div>
          <Spacer size={40} />
          <GridCoinsPanel
            rebalancingCoins={rebalancingCoins}
            wallet={wallet || []}
            symbolCurrency={symbolCurrency}
            setRebalancingCoins={onSetRebalancingCoins}
            detailedCoinsLoading={detailedCoinsLoading}
            isEditing={isEditingGridCoins}
            setEditing={setEditingGridCoins}
          />
        </Layout>
      </LoadErrorHandler>
    </RoutesHandler>
  );
};

export default Home;
