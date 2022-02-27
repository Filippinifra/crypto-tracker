import { FC } from "react";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { Grid } from "./Grid";
import { Typography } from "./Typography";

const getRow = (walletPiece: WalletPiece) => {
  const { percentage, typology, value } = walletPiece;

  const style: React.CSSProperties = { width: "100%", padding: 10, boxSizing: "border-box", backgroundColor: "white" };

  return [
    <Typography variant="body" key={`wallet-${typology}`} style={style}>
      {typology || "-"}
    </Typography>,
    <Typography variant="body" key={`wallet-${typology}-percentage`} style={style}>
      {percentage || "-"}
    </Typography>,
    <Typography variant="body" key={`wallet-${typology}-value`} style={style}>
      {value || "-"}
    </Typography>,
  ];
};

export const GridWallet: FC<{ wallet: WalletDivision }> = ({ wallet }) => {
  // @ts-ignore
  const walletData: any = wallet.reduce((r, walletDataRow) => {
    return [...r, ...getRow(walletDataRow)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={[...walletData]} />;
};
