import { FC } from "react";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { Grid } from "./Grid";
import { Typography } from "./Typography";

const LabelCell: FC<{ value: string | number; color?: string }> = ({ value, color }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: color || "white", padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || "-"}
    </Typography>
  );
};

const getHEaders = () => {
  return [
    <LabelCell color={"#F3D6FF"} value={"Tipologia"} key={`wallet-typology`} />,
    <LabelCell color={"#F3D6FF"} value={"Percentuale allocata"} key={`wallet-percentage`} />,
    <LabelCell color={"#F3D6FF"} value={"Corrispettivo $"} key={`wallet-value`} />,
  ];
};

const getRow = (walletPiece: WalletPiece) => {
  const { percentage, typology, value } = walletPiece;

  return [
    <LabelCell key={`wallet-${typology}`} value={typology} />,
    <LabelCell key={`wallet-${typology}-percentage`} value={percentage} />,
    <LabelCell key={`wallet-${typology}-value`} value={value} />,
  ];
};

export const GridWallet: FC<{ wallet: WalletDivision }> = ({ wallet }) => {
  // @ts-ignore
  const walletData: any = wallet.reduce((r, walletDataRow) => {
    return [...r, ...getRow(walletDataRow)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={[...getHEaders(), ...walletData]} />;
};
