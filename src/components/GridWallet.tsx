import { FC } from "react";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { gridWalletColor } from "utils/colors";
import { Grid } from "./Grid";
import { Typography } from "./Typography";

const LabelCell: FC<{ value: string | number; isTitle?: boolean }> = ({ value, isTitle }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: isTitle ? gridWalletColor : "white", padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || "-"}
    </Typography>
  );
};

const getHEaders = () => {
  return [
    <LabelCell value={"Tipologia"} key={`wallet-typology`} isTitle />,
    <LabelCell value={"Percentuale allocata"} key={`wallet-percentage`} isTitle />,
    <LabelCell value={"Corrispettivo $"} key={`wallet-value`} isTitle />,
  ];
};

const getRow = (walletPiece: WalletPiece, sumFiatValue: number) => {
  const { percentage, typology } = walletPiece;

  return [
    <LabelCell key={`wallet-${typology}`} value={typology} />,
    <LabelCell key={`wallet-${typology}-percentage`} value={percentage} />,
    <LabelCell key={`wallet-${typology}-value`} value={(sumFiatValue / 100) * percentage} />,
  ];
};

export const GridWallet: FC<{ wallet: WalletDivision; sumFiatValue: number }> = ({ wallet, sumFiatValue }) => {
  // @ts-ignore
  const walletData: any = wallet.reduce((r, walletDataRow) => {
    return [...r, ...getRow(walletDataRow, sumFiatValue)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={[...getHEaders(), ...walletData]} />;
};
