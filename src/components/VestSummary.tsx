import { Grid } from "components/Grid";
import { FC } from "react";
import { Typography } from "./Typography";

const LabelCell: FC<{ value: string | number; color?: string }> = ({ value, color }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: color || "white", padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || "-"}
    </Typography>
  );
};

export const VestSummary: FC<{ totalVest: number; sumFiatValue: number }> = ({ totalVest, sumFiatValue }) => {
  return (
    <Grid
      templateColumns={"200px 200px"}
      data={[
        <LabelCell color={"#FFD700"} value={"Totale investito"} key={"total-vest-title"} />,
        <LabelCell value={totalVest} key={"total-vest"} />,
        <LabelCell color={"#FFD700"} value={"Possesso fiat"} key={"fiat-sum-value-title"} />,
        <LabelCell value={sumFiatValue} key={"fiat-sum-value"} />,
        <LabelCell color={"#FFD700"} value={"Guadagno / perdita"} key={"profit-title"} />,
        <LabelCell value={sumFiatValue - totalVest} key={"profit"} />,
      ]}
    />
  );
};
