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
import { usePrefCurrency } from "hooks/usePrefCurrency";
import { getSymbolForCurrency } from "types/currency";
import { getCrossedCoins, toRebalancingCoins } from "utils/coins";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RebalancingCoins } from "types/rebalancingCoins";
import { PersonalCoin } from "types/personalCoins";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "hooks/useToast";
import { useResponsive } from "hooks/useResponsive";
import { useAuth } from "hooks/useAuth";
import { DoughnutCompleteChart } from "components/DoughnutCompleteChart";

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
  const { prefCurrency, setPrefCurrency, loading: prefCurrencyLoading } = usePrefCurrency();
  const { detailedCoins, error: detailedCoinsError, loading: detailedCoinsLoading } = useDetailedCoins(personalCoins, prefCurrency);
  const { getResponsiveValue } = useResponsive();
  const [isEditingGridCoins, setEditingGridCoins] = useState(false);
  const { currentUser } = useAuth();

  const showDoughnut = Boolean(wallet?.length) && Boolean(personalCoins?.length) && personalCoins?.some(({ typologyId, percentage }) => Boolean(typologyId) && Boolean(percentage));

  const { showToast } = useToast();

  const addCoin = (coin: AvailableCoin) => {
    const keyElement = uuidv4();
    const newCoin: PersonalCoin = { coins: 0, id: coin.id, keyElement, percentage: 0, platform: "", typologyId: "" };
    setPersonalCoins(personalCoins ? [...personalCoins, newCoin] : [newCoin]);
    showToast("Nuova moneta aggiunta", "success");
  };

  const options = availableCoins?.filter(({ id }) => id).map((value) => ({ value, label: `${value.symbol.toUpperCase()} // ${value.name} // ${value.id}` }));

  const crossedCoins = useMemo(() => getCrossedCoins(personalCoins || [], detailedCoins || []), [personalCoins, detailedCoins]);

  const sumFiatValue = crossedCoins?.reduce((r, { currentPrice, coins }) => r + (currentPrice || 0) * coins, 0);

  const data = Boolean(Boolean(personalCoins) && Boolean(wallet) && totalVest !== undefined && prefCurrency !== undefined);
  const loading = !coinsLoading && !walletLoading && !totalVestLoading && !prefCurrencyLoading;
  const error = !personalCoins && !wallet && !totalVest && !prefCurrencyLoading && !detailedCoinsError && loading;

  const symbolCurrency = getSymbolForCurrency(prefCurrency);

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

    if (wallet && JSON.stringify(personalCoins) !== JSON.stringify(result) && result) {
      setPersonalCoins(result);
      showToast("Le monete assegnate a tipologie che sono state rimosse ora hanno una tipologia vuota", "warning");
    }
  }, [personalCoins, wallet, setPersonalCoins, showToast]);

  useEffect(() => {
    if (!loading && !error) {
      removesNotExistingTypologyId();
    }

    return () => removesNotExistingTypologyId();
  }, [wallet, loading, error, removesNotExistingTypologyId]);

  return (
    <LoadErrorHandler data={data} error={error}>
      <Layout prefCurrency={prefCurrency} setPrefCurrency={setPrefCurrency} personalCoins={personalCoins || []}>
        <Typography variant="body">
          {"Ciao "}
          <Typography variant="body" style={{ fontWeight: 600 }} component="span">
            {currentUser?.email}
          </Typography>
        </Typography>
        <Spacer size={50} />
        <div style={{ display: "flex", flexDirection: getResponsiveValue(["column", "column", "row"]), alignItems: getResponsiveValue(["center", "", ""]) }}>
          <div style={{ marginRight: getResponsiveValue([0, 0, 150]), width: getResponsiveValue(["100%", "fit-content", "auto"]) }}>
            <VestSummaryPanel totalVest={totalVest || 0} setTotalVest={setTotalVest} sumFiatValue={sumFiatValue || 0} symbolCurrency={symbolCurrency} />
            <Spacer size={40} />
            <div style={{ height: "auto" }}>
              <GridWalletPanel wallet={wallet || []} setWallet={setWallet} sumFiatValue={sumFiatValue || 0} symbolCurrency={symbolCurrency} />
            </div>
          </div>
          {getResponsiveValue([true, true, false]) && <Spacer size={40} />}
          {showDoughnut && <DoughnutCompleteChart personalCoins={personalCoins || []} wallet={wallet || []} />}
        </div>
        <Spacer size={50} />
        <Typography variant="body">Aggiungi le tue coins:</Typography>
        <Spacer size={20} />
        <div style={{ width: getResponsiveValue(["auto", "550px", "600px"]), margin: "6px 0 0 6px" }}>
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
  );
};

export default Home;
