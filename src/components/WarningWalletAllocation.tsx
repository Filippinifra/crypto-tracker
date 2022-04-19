import { FC } from "react";
import { EditingWalletDivision } from "types/walletDivision";
import { errorColor } from "utils/colors";
import { Icon } from "components/Icon";
import { Tooltip } from "components/Tooltip";
import { Typography } from "components/Typography";
import { Trans } from "react-i18next";

export const WarningWalletAllocation: FC<{ wallet: EditingWalletDivision }> = ({ wallet }) => {
  const totalPercentage = wallet.reduce((r, { percentage }) => r + (percentage || 0), 0);
  const showWarning = totalPercentage !== 100;

  return showWarning ? (
    <Tooltip
      content={
        <Typography variant="body">
          <Trans i18nKey={"home.wallet.percentageSumNotCorrect"} values={{ amount: totalPercentage }} />
        </Typography>
      }
      placement="top"
    >
      <Icon style={{ color: errorColor }} name="warning_amber" />
    </Tooltip>
  ) : null;
};
