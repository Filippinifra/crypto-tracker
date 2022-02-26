import { FC } from "react";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { Grid } from "./Grid";
import { Typography } from "./Typography";

const getRow = (walletPiece: WalletPiece, index: number) => {
  const { percentage, typology, value } = walletPiece;

  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [<input />, <input />, <Typography variant="body">{value || "-"}</Typography>];
};

export const GridWallet: FC<{ wallet: WalletDivision }> = ({ wallet }) => {
  // @ts-ignore
  const walletData: any = wallet.reduce((r, walletDataRow, index) => {
    return [...r, ...getRow(walletDataRow, index)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={[...walletData]} />;
};
