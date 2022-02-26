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
    <LabelCell color={"#FEA99A"} value={"Tipologia"} key={`type`} />,
    <LabelCell color={"#F7D5A1"} value={"Logo"} key={`image`} />,
    <LabelCell color={"#F7D5A1"} value={"Simbolo e nome"} key={`name`} />,
    <LabelCell color={"#F8ED8B"} value={"Allocazione %"} key={`perc`} />,
    <LabelCell color={"#F8ED8B"} value={"Controvalore allocazione"} key={`value-for-perc`} />,
    <LabelCell color={"#C6EF81"} value={"Prezzo"} key={`price`} />,
    <LabelCell color={"#C6EF81"} value={"Variazione 24%"} key={`price-variation`} />,
    <LabelCell color={"#B4EAF8"} value={"Tokens"} key={`holding-token`} />,
    <LabelCell color={"#B4EAF8"} value={"Possesso $"} key={`holding-in-fiat`} />,
    <LabelCell color={"#E2B6D2"} value={"Bilanciamento percentuale"} key={`perc-balancing`} />,
    <LabelCell color={"#E2B6D2"} value={"Sbilanciamento valore in $"} key={`value-balancing`} />,
    <LabelCell color={"#E2B6D2"} value={"Numero coin per ribilancio"} key={`coin-balancing`} />,
  ];
};

const getRow = ({ symbol, name, image, current_price, price_change_percentage_24h, id }, index) => {
  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [
    <LabelCell color={color} value={"Tipologia"} key={`${id}-type`} />,
    <div style={{ backgroundColor: color, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }} key={`${id}-image`}>
      <Image src={image} alt={id} height={25} width={25} />
    </div>,
    <LabelCell color={color} value={`${symbol.toUpperCase()} | ${name}`} key={`${id}-name`} />,
    <LabelCell color={color} value={"Percentage"} key={`${id}-perc`} />,
    <LabelCell color={color} value={"Controvalore"} key={`${id}-value-for-perc`} />,
    <LabelCell color={color} value={current_price} key={`${id}-price`} />,
    <LabelCell color={color} value={price_change_percentage_24h} key={`${id}-price-variation`} />,
    <LabelCell color={color} value={"Token posseduti"} key={`${id}-holding-token`} />,
    <LabelCell color={color} value={"Possesso"} key={`${id}-holding-in-fiat`} />,
    <LabelCell color={color} value={"Percentuale bilanciamento"} key={`${id}-perc-balancing`} />,
    <LabelCell color={color} value={"Sbilanciamento valore"} key={`${id}-value-balancing`} />,
    <LabelCell color={color} value={"Numero coin per ribilancio"} key={`${id}-coin-balancing`} />,
  ];
};

export const GridCoins = ({ data }) => {
  const coins = data?.length
    ? data.reduce((r, coinData, index) => {
        return [...r, ...getRow(coinData, index)];
      }, [])
    : [];

  return <Grid templateColumns={"150px 58px 200px 121px 125px 100px 130px 95px 100px 140px 140px 130px"} data={[...getHEaders(), ...coins]} />;
};
