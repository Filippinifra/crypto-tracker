import { Grid } from "components/Grid";
import Image from "next/image";
import { FC } from "react";
import { CurrencySymbol } from "types/currency";
import { RebalancingCoin, RebalancingCoins } from "types/rebalancingCoins";
import { getFiatRebalanceColor, getPercentageBalanceColor, greenVariationColor, gridCoinColors, redVariationColor } from "utils/colors";
import { Typography } from "components/Typography";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";

const LabelCell: FC<{ value: string | number; color: string; trunc?: boolean; height?: number; textColor?: string }> = ({ value, color, trunc = true, height, textColor }) => {
  const style: React.CSSProperties = {
    width: "100%",
    backgroundColor: color,
    padding: 10,
    boxSizing: "border-box",
    color: textColor,
    ...(height && { height, display: "flex", alignItems: "center", justifyContent: "center" }),
    ...(trunc && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }),
  };

  return (
    <Typography variant="body" style={style}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

const getHEaders = () => {
  return [
    <LabelCell height={50} trunc={false} color={gridCoinColors[0]} value={"Tipologia"} key={`coin-table-type`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[1]} value={"Logo"} key={`coin-table-image`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[1]} value={"Simbolo e nome"} key={`coin-table-name`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[2]} value={"Allocazione"} key={`coin-table-perc`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[2]} value={"Controvalore allocazione"} key={`coin-table-value-for-perc`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[3]} value={"Prezzo"} key={`coin-table-price`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[3]} value={"Variazione 24 ore"} key={`coin-table-price-variation`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[4]} value={"Tokens"} key={`coin-table-holding-token`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[4]} value={"Possesso"} key={`coin-table-holding-in-fiat`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[5]} value={"Bilanciamento percentuale"} key={`coin-table-perc-balancing`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[5]} value={"Sbilanciamento valore"} key={`coin-table-value-balancing`} />,
    <LabelCell height={50} trunc={false} color={gridCoinColors[5]} value={"Numero coin per ribilancio"} key={`coin-table-coin-balancing`} />,
  ];
};

const getRow = (coin: RebalancingCoin, index: number, symbolCurrency: CurrencySymbol) => {
  const {
    symbolAndName,
    logoUrl,
    price,
    priceChangePercentage24h,
    id,
    allocationPercentage,
    coins,
    holdingInFiat,
    balancingPercentage,
    rebalancingInFiat,
    rebalancingCoins,
    idealAllocationValue,
    typology,
  } = coin;

  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [
    <LabelCell color={color} value={typology} key={`coin-table-${id}-type`} />,
    <div style={{ backgroundColor: color, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }} key={`coin-table-${id}-image`}>
      <Image src={logoUrl} alt={id} height={25} width={25} />
    </div>,
    <LabelCell color={color} value={symbolAndName} key={`coin-table-${id}-name`} />,
    <LabelCell color={color} value={`${allocationPercentage}%`} key={`coin-table-${id}-perc`} />,
    <LabelCell color={color} value={`${getSplittedPrice(idealAllocationValue)}${symbolCurrency}`} key={`coin-table-${id}-value-for-perc`} />,
    <LabelCell color={color} value={`${getSplittedPrice(price)}${symbolCurrency}`} key={`coin-table-${id}-price`} />,
    <LabelCell
      color={color}
      textColor={priceChangePercentage24h < 0 ? redVariationColor : greenVariationColor}
      value={`${getSplittedPrice(priceChangePercentage24h, 3, 2, true)}%`}
      key={`coin-table-${id}-price-variation`}
    />,
    <LabelCell color={color} value={coins} key={`coin-table-${id}-holding-token`} />,
    <LabelCell color={color} value={`${getSplittedPrice(holdingInFiat, 5, 2)}${symbolCurrency}`} key={`coin-table-${id}-holding-in-fiat`} />,
    <LabelCell color={getPercentageBalanceColor(balancingPercentage)} value={`${getSplittedPrice(balancingPercentage, 5, 0)}%`} key={`coin-table-${id}-perc-balancing`} />,
    <LabelCell color={getFiatRebalanceColor(rebalancingInFiat)} value={`${getSplittedPrice(rebalancingInFiat, 5, 2)}${symbolCurrency}`} key={`coin-table-${id}-value-balancing`} />,
    <LabelCell color={color} value={getSplittedPrice(rebalancingCoins)} key={`coin-table-${id}-coin-balancing`} />,
  ];
};

export const GridCoins: FC<{ rebalancingCoins: RebalancingCoins; symbolCurrency: CurrencySymbol }> = ({ rebalancingCoins, symbolCurrency }) => {
  // @ts-ignore
  const coinsData: any[] = rebalancingCoins.reduce((r, coinData, index) => {
    return [...r, ...getRow(coinData, index, symbolCurrency)];
  }, []);

  return <Grid templateColumns={"150px 58px 160px 100px 110px 90px 85px 80px 90px 120px 120px 120px"} data={[...getHEaders(), ...coinsData]} />;
};
