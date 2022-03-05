import { Grid } from "components/Grid";
import { FC } from "react";
import { CurrencySymbol } from "types/currency";
import { vestColor } from "utils/colors";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { Typography } from "components/Typography";

const LabelCell: FC<{ value: string | number; isTitle?: boolean }> = ({ value, isTitle }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: isTitle ? vestColor : "white", padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

export const VestSummary: FC<{ totalVest: number; sumFiatValue: number; symbolCurrency: CurrencySymbol }> = ({ totalVest, sumFiatValue, symbolCurrency }) => {
  return (
    <Grid
      templateColumns={"200px 200px"}
      data={[
        <LabelCell value={"Totale investito"} key={"total-vest-title"} isTitle />,
        <LabelCell value={`${totalVest}${symbolCurrency}`} key={"total-vest"} />,
        <LabelCell value={"Controvalore ora"} key={"fiat-sum-value-title"} isTitle />,
        <LabelCell value={`${getSplittedPrice(sumFiatValue, 5, 0)}${symbolCurrency}`} key={"fiat-sum-value"} />,
        <LabelCell value={"Guadagno / perdita"} key={"profit-title"} isTitle />,
        <LabelCell value={`${getSplittedPrice(sumFiatValue - totalVest, 5, 0)}${symbolCurrency}`} key={"profit"} />,
      ]}
    />
  );
};
