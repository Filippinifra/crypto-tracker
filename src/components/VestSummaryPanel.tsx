import { Grid } from "components/Grid";
import { Dispatch, FC, FormEvent, KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { CurrencySymbol } from "types/currency";
import { getVestSummaryColor, vestColor } from "utils/colors";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { Input } from "components/Input";
import { useToast } from "contexts/ToastContext";
import { EditButtons } from "components/EditButtons";

const LabelCell: FC<{ value: string | number; isTitle?: boolean; color?: string }> = ({ value, isTitle, color }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: color || (isTitle ? vestColor : "white"), padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

export const VestSummaryPanel: FC<{ totalVest: number; setTotalVest: Dispatch<SetStateAction<number | undefined>>; sumFiatValue: number; symbolCurrency: CurrencySymbol }> = ({
  totalVest,
  setTotalVest,
  sumFiatValue,
  symbolCurrency,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [tempTotalVest, setTempTotalVest] = useState(totalVest);
  const { showToast } = useToast();

  const profit = sumFiatValue - totalVest;
  const percentageProfit = 100 / (totalVest / profit);
  const profitResultLabel = `${getSplittedPrice(profit, 5, 0)}${symbolCurrency} ${!isNaN(percentageProfit) && isFinite(percentageProfit) ? `(${percentageProfit.toFixed(1)}%)` : ""}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event?.key === "Enter") {
      onConfirm();
    }
  };

  const onConfirm = () => {
    if (isEditing) {
      setEditing(false);
      if (tempTotalVest) {
        setTotalVest(tempTotalVest);
      } else {
        setTempTotalVest(totalVest);
      }
    } else {
      setEditing(true);
    }
  };

  useEffect(() => {
    setTempTotalVest(totalVest);
  }, [totalVest]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body">Sommario investimento:</Typography>
        <EditButtons
          isEditing={isEditing}
          onEdit={() => {
            setEditing(true);
          }}
          onSave={() => {
            setEditing(false);
            if (tempTotalVest) {
              setTotalVest(tempTotalVest);
            } else {
              setTempTotalVest(totalVest);
            }
          }}
          onCancel={() => {
            setEditing(false);
            setTempTotalVest(totalVest);
          }}
        />
      </div>
      <Spacer size={20} />
      <Grid
        templateColumns={"200px 200px"}
        data={[
          <LabelCell value={"Totale investito"} key={"total-vest-title"} isTitle />,
          isEditing ? (
            <Input
              value={tempTotalVest}
              type="number"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                const value = Number(e.currentTarget.value);
                if (value >= 0) {
                  setTempTotalVest(value);
                } else {
                  showToast("Non puoi aver investito un numero negativo di denaro", "error");
                }
              }}
              onKeyDown={handleKeyDown}
              key={"total-vest-input"}
            />
          ) : (
            <LabelCell value={`${totalVest}${symbolCurrency}`} key={"total-vest"} />
          ),
          <LabelCell value={"Controvalore ora"} key={"fiat-sum-value-title"} isTitle />,
          <LabelCell value={`${getSplittedPrice(sumFiatValue, 5, 0)}${symbolCurrency}`} key={"fiat-sum-value"} />,
          <LabelCell value={"Guadagno / perdita"} key={"profit-title"} isTitle />,
          <LabelCell color={getVestSummaryColor(profit)} value={profitResultLabel} key={"profit"} />,
        ]}
      />
    </>
  );
};
