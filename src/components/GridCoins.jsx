import { Grid } from "components/Grid";
import Image from "next/image";
import { Typography } from "./Typography";

const LabelCell = ({ value, color }) => {
  const style = { width: "100%", backgroundColor: color, padding: 10, boxSizing: "border-box", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

  return (
    <Typography variant="body" style={style}>
      {value || "-"}
    </Typography>
  );
};

const getHEaders = () => {
  return [
    <LabelCell color={"#FEA99A"} value={"Tipologia"} key={`coin-table-type`} />,
    <LabelCell color={"#F7D5A1"} value={"Logo"} key={`coin-table-image`} />,
    <LabelCell color={"#F7D5A1"} value={"Simbolo e nome"} key={`coin-table-name`} />,
    <LabelCell color={"#F8ED8B"} value={"Allocazione %"} key={`coin-table-perc`} />,
    <LabelCell color={"#F8ED8B"} value={"Controvalore allocazione"} key={`coin-table-value-for-perc`} />,
    <LabelCell color={"#C6EF81"} value={"Prezzo"} key={`coin-table-price`} />,
    <LabelCell color={"#C6EF81"} value={"Variazione 24%"} key={`coin-table-price-variation`} />,
    <LabelCell color={"#B4EAF8"} value={"Tokens"} key={`coin-table-holding-token`} />,
    <LabelCell color={"#B4EAF8"} value={"Possesso $"} key={`coin-table-holding-in-fiat`} />,
    <LabelCell color={"#E2B6D2"} value={"Bilanciamento percentuale"} key={`coin-table-perc-balancing`} />,
    <LabelCell color={"#E2B6D2"} value={"Sbilanciamento valore in $"} key={`coin-table-value-balancing`} />,
    <LabelCell color={"#E2B6D2"} value={"Numero coin per ribilancio"} key={`coin-table-coin-balancing`} />,
  ];
};

const getRow = ({ symbol, name, image, current_price, price_change_percentage_24h, id }, index) => {
  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [
    <LabelCell color={color} value={"Tipologia"} key={`coin-table-${id}-type`} />,
    <div style={{ backgroundColor: color, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }} key={`coin-table-${id}-image`}>
      <Image src={image} alt={id} height={25} width={25} />
    </div>,
    <LabelCell color={color} value={`${symbol.toUpperCase()} | ${name}`} key={`coin-table-${id}-name`} />,
    <LabelCell color={color} value={"Percentage"} key={`coin-table-${id}-perc`} />,
    <LabelCell color={color} value={"Controvalore"} key={`coin-table-${id}-value-for-perc`} />,
    <LabelCell color={color} value={current_price} key={`coin-table-${id}-price`} />,
    <LabelCell color={color} value={price_change_percentage_24h} key={`coin-table-${id}-price-variation`} />,
    <LabelCell color={color} value={"Token posseduti"} key={`coin-table-${id}-holding-token`} />,
    <LabelCell color={color} value={"Possesso"} key={`coin-table-${id}-holding-in-fiat`} />,
    <LabelCell color={color} value={"Percentuale bilanciamento"} key={`coin-table-${id}-perc-balancing`} />,
    <LabelCell color={color} value={"Sbilanciamento valore"} key={`coin-table-${id}-value-balancing`} />,
    <LabelCell color={color} value={"Numero coin per ribilancio"} key={`coin-table-${id}-coin-balancing`} />,
  ];
};

export const GridCoins = ({ data }) => {
  const coins = data.reduce((r, coinData, index) => {
    return [...r, ...getRow(coinData, index)];
  }, []);

  return <Grid templateColumns={"150px 58px 200px 121px 125px 100px 130px 95px 100px 140px 140px 130px"} data={[...getHEaders(), ...coins]} />;
};
