import { Grid } from "components/Grid";
import { FC, FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { CurrencySymbol } from "types/currency";
import { getVestSummaryColor, vestColor } from "utils/colors";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { Input } from "components/Input";
import { useToast } from "hooks/useToast";
import { EditButtons } from "components/EditButtons";
import { useResponsive } from "hooks/useResponsive";
import { EditingTotalVest, TotalVest } from "types/totalVest";
import { useTranslation } from "react-i18next";

const LabelCell: FC<{ value: string | number; isTitle?: boolean; color?: string }> = ({ value, isTitle, color }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: color || (isTitle ? vestColor : "white"), padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

export const VestSummaryPanel: FC<{ totalVest: number; setTotalVest: (newVesting: TotalVest) => void; sumFiatValue: number; symbolCurrency: CurrencySymbol }> = ({
  totalVest,
  setTotalVest,
  sumFiatValue,
  symbolCurrency,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [tempTotalVest, setTempTotalVest] = useState<EditingTotalVest>(totalVest);
  const { showToast } = useToast();
  const { getResponsiveValue } = useResponsive();
  const { t } = useTranslation();

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
        <Typography variant="body">{t("home.vesting.title")}</Typography>
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
              showToast(t("home.vesting.vestingCantBeZero"), "error");
            }
          }}
          onCancel={() => {
            setEditing(false);
            setTempTotalVest(totalVest);
            showToast(t("home.vesting.editingCanceled"), "warning");
          }}
        />
      </div>
      <Spacer size={20} />
      <div style={{ padding: "0 0 0 5px" }}>
        <Grid
          templateColumns={getResponsiveValue(["1fr 1fr", "200px 200px", "200px 200px"])}
          fullWidth={getResponsiveValue([true, false, false])}
          data={[
            <LabelCell value={t("home.vesting.totalInvested")} key={"total-vest-title"} isTitle />,
            isEditing ? (
              <Input
                type="number"
                value={tempTotalVest !== null ? tempTotalVest : ""}
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget.value;
                  const value = Number(e.currentTarget.value);
                  if (value >= 0) {
                    setTempTotalVest(input === "" ? null : value);
                  } else {
                    showToast(t("home.vesting.vestingCantBeZero"), "error");
                  }
                }}
                onKeyDown={handleKeyDown}
                key={"total-vest-input"}
              />
            ) : (
              <LabelCell value={`${totalVest}${symbolCurrency}`} key={"total-vest"} />
            ),
            <LabelCell value={t("home.vesting.yourCoinsValue")} key={"fiat-sum-value-title"} isTitle />,
            <LabelCell value={`${getSplittedPrice(sumFiatValue, 5, 0)}${symbolCurrency}`} key={"fiat-sum-value"} />,
            <LabelCell value={t("home.vesting.profitOrLoss")} key={"profit-title"} isTitle />,
            <LabelCell color={getVestSummaryColor(profit)} value={profitResultLabel} key={"profit"} />,
          ]}
        />
      </div>
    </>
  );
};
