import { FC } from "react";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { Grid } from "./Grid";
import { Typography } from "./Typography";

const getRow = (walletPiece: WalletPiece, index: number) => {
  const { percentage, typology, value } = walletPiece;

  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [
    <input key={`wallet-${typology}`} />,
    <input key={`wallet-${typology}-percentage`} />,
    <Typography variant="body" key={`wallet-${typology}-value`}>
      {value || "-"}
    </Typography>,
  ];
};

export const GridWallet: FC<{ wallet: WalletDivision }> = ({ wallet }) => {
  // @ts-ignore
  const walletData: any = wallet.reduce((r, walletDataRow, index) => {
    return [...r, ...getRow(walletDataRow, index)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={[...walletData]} />;
};
