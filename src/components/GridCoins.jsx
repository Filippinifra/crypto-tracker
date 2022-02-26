import { Grid } from "components/Grid";
import { Typography } from "./Typography";

const LabelCell = ({ value, key, color }) => {
  const style = { width: "100%", backgroundColor: color, padding: 10, boxSizing: "border-box", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

  return (
    <Typography variant="body" key={key} style={style}>
      {value || "-"}
    </Typography>
  );
};

const getHEaders = () => {
  return [
    <LabelCell color={"#FEA99A"} value={"Tipologia"} />,
    <LabelCell color={"#F7D5A1"} value={"Logo"} />,
    <LabelCell color={"#F7D5A1"} value={"Simbolo e nome"} />,
    <LabelCell color={"#F8ED8B"} value={"Allocazione %"} />,
    <LabelCell color={"#F8ED8B"} value={"Controvalore allocazione"} />,
    <LabelCell color={"#C6EF81"} value={"Prezzo"} />,
    <LabelCell color={"#C6EF81"} value={"Variazione 24%"} />,
    <LabelCell color={"#B4EAF8"} value={"Tokens"} />,
    <LabelCell color={"#B4EAF8"} value={"Possesso $"} />,
    <LabelCell color={"#E2B6D2"} value={"Bilanciamento percentuale"} />,
    <LabelCell color={"#E2B6D2"} value={"Sbilanciamento valore in $"} />,
    <LabelCell color={"#E2B6D2"} value={"Numero coin per ribilancio"} />,
  ];
};

const getRow = ({ symbol, name, image, current_price, price_change_percentage_24h }, index) => {
  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [
    <LabelCell color={color} value={"Tipologia"} />,
    <div style={{ backgroundColor: color, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={image} style={{ height: 25, width: 25 }} />
    </div>,
    <LabelCell color={color} value={`${symbol.toUpperCase()} | ${name}`} />,
    <LabelCell color={color} value={"Percentage"} />,
    <LabelCell color={color} value={"Controvalore"} />,
    <LabelCell color={color} value={current_price} />,
    <LabelCell color={color} value={price_change_percentage_24h} />,
    <LabelCell color={color} value={"Token posseduti"} />,
    <LabelCell color={color} value={"Possesso"} />,
    <LabelCell color={color} value={"Percentuale bilanciamento"} />,
    <LabelCell color={color} value={"Sbilanciamento valore"} />,
    <LabelCell color={color} value={"Numero coin per ribilancio"} />,
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
