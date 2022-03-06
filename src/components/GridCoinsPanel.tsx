import { Grid } from "components/Grid";
import Image from "next/image";
import React, { FC, useState } from "react";
import { CurrencySymbol } from "types/currency";
import { RebalancingCoin, RebalancingCoins } from "types/rebalancingCoins";
import { getFiatRebalanceColor, getPercentageBalanceColor, greenVariationColor, headerGridCoinColors, redVariationColor } from "utils/colors";
import { Typography } from "components/Typography";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { WalletDivision } from "types/walletDivision";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { Button } from "components/Button";
import { TypologyDropdown } from "components/TypologyDropdown";

const LabelCell: FC<{ value: string | number; color: string; trunc?: boolean; height?: number; textColor?: string; style?: React.CSSProperties }> = ({
  value,
  color,
  trunc = true,
  height,
  textColor,
  style,
}) => {
  const additionalStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: color,
    padding: 10,
    boxSizing: "border-box",
    color: textColor,
    ...style,
    ...(height && { height, display: "flex", alignItems: "center", justifyContent: "center" }),
    ...(trunc && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }),
  };

  return (
    <Typography variant="body" style={additionalStyle}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

const getHeaders = () => {
  return [
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[0]} value={"Tipologia"} key={`coin-table-type`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[1]} value={"Logo"} key={`coin-table-image`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[1]} value={"Simbolo e nome"} key={`coin-table-name`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[2]} value={"Allocazione"} key={`coin-table-perc`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[2]} value={"Controvalore allocazione"} key={`coin-table-value-for-perc`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[3]} value={"Prezzo"} key={`coin-table-price`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[3]} value={"Variazione 24 ore"} key={`coin-table-price-variation`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[4]} value={"Tokens"} key={`coin-table-holding-token`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[4]} value={"Possesso"} key={`coin-table-holding-in-fiat`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={"Bilanciamento percentuale"} key={`coin-table-perc-balancing`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={"Sbilanciamento valore"} key={`coin-table-value-balancing`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={"Numero coin per ribilancio"} key={`coin-table-coin-balancing`} />,
  ];
};

const getRow = (coin: RebalancingCoin, index: number, wallet: WalletDivision, symbolCurrency: CurrencySymbol, isEditing: boolean) => {
  const {
    symbolAndName,
    logoUrl,
    price,
    priceChangePercentage24h,
    allocationPercentage,
    coins,
    holdingInFiat,
    balancingPercentage,
    rebalancingInFiat,
    rebalancingCoins,
    idealAllocationValue,
    typology,
    keyElement,
  } = coin;

  const color = index % 2 === 0 ? "#f4f4f5" : "#d4d4d8";

  const colorTypologyText = wallet.find(({ typology: walletTypology }) => walletTypology === typology);

  const typologyDrodpownOptions = wallet.map((e) => ({ label: e.typology, value: e, color: e.color }));
  const currentTypology = typologyDrodpownOptions.find(({ value: { typology: walletTypology } }) => walletTypology === typology);

  return [
    isEditing ? (
      <TypologyDropdown options={typologyDrodpownOptions} value={currentTypology ? currentTypology : null} onChange={() => {}} />
    ) : (
      <LabelCell
        textColor={colorTypologyText?.color || "black"}
        color={"white"}
        value={typology}
        key={`coin-table-${keyElement}-type`}
        style={{ fontWeight: 800, border: `5px solid ${colorTypologyText?.color}`, padding: 5 }}
      />
    ),
    <div style={{ backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center" }} key={`coin-table-${keyElement}-image`}>
      <Image src={logoUrl} alt={keyElement} height={25} width={25} />
    </div>,
    <LabelCell color={color} value={symbolAndName} key={`coin-table-${keyElement}-name`} />,
    isEditing ? <Input value={allocationPercentage} onChange={() => {}} /> : <LabelCell color={color} value={`${allocationPercentage}%`} key={`coin-table-${keyElement}-perc`} />,
    <LabelCell color={color} value={`${getSplittedPrice(idealAllocationValue)}${symbolCurrency}`} key={`coin-table-${keyElement}-value-for-perc`} />,
    <LabelCell color={color} value={`${getSplittedPrice(price)}${symbolCurrency}`} key={`coin-table-${keyElement}-price`} />,
    <LabelCell
      color={color}
      textColor={priceChangePercentage24h < 0 ? redVariationColor : greenVariationColor}
      value={`${getSplittedPrice(priceChangePercentage24h, 3, 2, true)}%`}
      key={`coin-table-${keyElement}-price-variation`}
    />,
    isEditing ? <Input value={coins} onChange={() => {}} /> : <LabelCell color={color} value={coins} key={`coin-table-${keyElement}-holding-token`} />,
    <LabelCell color={color} value={`${getSplittedPrice(holdingInFiat, 5, 2)}${symbolCurrency}`} key={`coin-table-${keyElement}-holding-in-fiat`} />,
    <LabelCell color={getPercentageBalanceColor(balancingPercentage)} value={`${getSplittedPrice(balancingPercentage, 5, 0)}%`} key={`coin-table-${keyElement}-perc-balancing`} />,
    <LabelCell color={getFiatRebalanceColor(rebalancingInFiat)} value={`${getSplittedPrice(rebalancingInFiat, 5, 2)}${symbolCurrency}`} key={`coin-table-${keyElement}-value-balancing`} />,
    <LabelCell color={color} value={getSplittedPrice(rebalancingCoins)} key={`coin-table-${keyElement}-coin-balancing`} />,
  ];
};

export const GridCoinsPanel: FC<{ rebalancingCoins: RebalancingCoins; wallet: WalletDivision; symbolCurrency: CurrencySymbol }> = ({ rebalancingCoins, wallet, symbolCurrency }) => {
  const [isEditing, setEditing] = useState(false);
  // @ts-ignore
  const coinsData: any[] = rebalancingCoins.reduce((r, coinData, index) => {
    return [...r, ...getRow(coinData, index, wallet, symbolCurrency, isEditing)];
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1285 }}>
        <Typography variant="body">Allocazione asset e ribilanciamento:</Typography>
        <Button
          onClick={() => {
            if (isEditing) {
              setEditing(false);
            } else {
              setEditing(true);
            }
          }}
        >
          <Typography variant="body">{isEditing ? "Salva" : "Modifica"}</Typography>
        </Button>
      </div>
      <Spacer size={20} />
      <Grid templateColumns={"150px 58px 160px 100px 110px 90px 85px 80px 90px 120px 120px 120px"} data={[...getHeaders(), ...coinsData]} />
    </>
  );
};
