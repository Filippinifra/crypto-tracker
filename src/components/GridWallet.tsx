import { FC } from "react";
import { CurrencySymbol } from "types/currency";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { gridWalletColor } from "utils/colors";
import { PLACEHOLDER } from "utils/labels";
import { Grid } from "components/Grid";
import { Typography } from "components/Typography";

const LabelCell: FC<{ value: string | number; isTitle?: boolean }> = ({ value, isTitle }) => {
  const style: React.CSSProperties = { width: "100%", backgroundColor: isTitle ? gridWalletColor : "white", padding: 10, boxSizing: "border-box" };

  return (
    <Typography variant="body" style={style}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

const getHEaders = () => {
  return [
    <LabelCell value={"Tipologia"} key={`wallet-typology`} isTitle />,
    <LabelCell value={"Percentuale"} key={`wallet-percentage`} isTitle />,
    <LabelCell value={"Corrispettivo"} key={`wallet-value`} isTitle />,
  ];
};

const getRow = (walletPiece: WalletPiece, sumFiatValue: number, symbolCurrency: string | undefined) => {
  const { percentage, typology } = walletPiece;

  return [
    <LabelCell key={`wallet-${typology}`} value={typology} />,
    <LabelCell key={`wallet-${typology}-percentage`} value={percentage} />,
    <LabelCell key={`wallet-${typology}-value`} value={`${(sumFiatValue / 100) * percentage}${symbolCurrency}`} />,
  ];
};

export const GridWallet: FC<{ wallet: WalletDivision; sumFiatValue: number; symbolCurrency: CurrencySymbol }> = ({ wallet, sumFiatValue, symbolCurrency }) => {
  // @ts-ignore
  const walletData: any = wallet.reduce((r, walletDataRow) => {
    return [...r, ...getRow(walletDataRow, sumFiatValue, symbolCurrency)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={[...getHEaders(), ...walletData]} />;
};
