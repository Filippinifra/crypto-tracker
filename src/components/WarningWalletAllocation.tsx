import { FC } from "react";
import { WalletDivision } from "types/walletDivision";
import { errorColor } from "utils/colors";
import { Icon } from "components/Icon";
import { Tooltip } from "components/Tooltip";
import { Typography } from "components/Typography";

export const WarningWalletAllocation: FC<{ wallet: WalletDivision }> = ({ wallet }) => {
  const totalPercentage = wallet.reduce((r, { percentage }) => r + percentage, 0);
  const showWarning = totalPercentage !== 100;

  return showWarning ? (
    <Tooltip content={<Typography variant="body">La somma delle percentuali nel tuo portafoglio non fa 100!</Typography>} placement="top">
      <Icon style={{ color: errorColor }} name="warning" />
    </Tooltip>
  ) : null;
};
