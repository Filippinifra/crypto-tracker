import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { CurrencySymbol } from "types/currency";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { headerGridWalletColor } from "utils/colors";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { Grid } from "components/Grid";
import { Typography } from "components/Typography";
import { WarningWalletAllocation } from "components/WarningWalletAllocation";
import { Spacer } from "components/Spacer";
import { EditButtons } from "components/EditButtons";
import { useToast } from "contexts/ToastContext";
import { Input } from "components/Input";
import { ToastType } from "types/toastType";

const LabelCell: FC<{ value: string | number; isTitle?: boolean; color?: string; style?: React.CSSProperties }> = ({ value, isTitle, color, style }) => {
  const additionalStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: isTitle ? headerGridWalletColor : "white",
    padding: 10,
    boxSizing: "border-box",
    color,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Typography variant="body" style={{ ...additionalStyle, ...style }}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

const getHeaders = () => {
  return [
    <LabelCell value={"Tipologia"} key={`wallet-typology`} isTitle />,
    <LabelCell value={"Percentuale"} key={`wallet-percentage`} isTitle />,
    <LabelCell value={"Corrispettivo"} key={`wallet-value`} isTitle />,
  ];
};

const getRow = (
  walletPiece: WalletPiece,
  sumFiatValue: number,
  symbolCurrency: string | undefined,
  index: number,
  isEditing: boolean,
  setTempWallet: React.Dispatch<React.SetStateAction<WalletDivision>>,
  showToast: (message: string, type: ToastType) => void
) => {
  const { percentage, typologyId, color: colorTypology, typologyName } = walletPiece;

  const colorRow = index % 2 === 0 ? "#f4f4f5" : "#d4d4d8";

  const onChangeTypologyName = (newName: string) => {
    setTempWallet((walletPieces) => walletPieces.map((wp) => (wp.typologyId === typologyId ? { ...wp, typologyName: newName } : wp)));
  };

  const onChangePercentage = (newPercentage: number) => {
    setTempWallet((walletPieces) => walletPieces.map((wp) => (wp.typologyId === typologyId ? { ...wp, percentage: newPercentage } : wp)));
  };

  return [
    isEditing ? (
      <Input
        value={typologyName}
        onChange={(e) => {
          onChangeTypologyName(e.currentTarget.value);
        }}
        key={`wallet-${typologyId}-input`}
      />
    ) : (
      <LabelCell color={colorTypology} key={`wallet-${typologyId}`} value={typologyName} style={{ fontWeight: 800, backgroundColor: colorRow }} />
    ),
    isEditing ? (
      <Input
        value={percentage}
        onChange={(e) => {
          const value = Number(e.currentTarget.value);
          if (value < 0) {
            showToast("Non puoi inserire un numero negativo di allocazione percentuale", "error");
          } else {
            onChangePercentage(value);
          }
        }}
        type="number"
        key={`wallet-${typologyId}-percentage-input`}
      />
    ) : (
      <LabelCell key={`wallet-${typologyId}-percentage`} value={`${percentage}%`} style={{ backgroundColor: colorRow }} />
    ),
    <LabelCell key={`wallet-${typologyId}-value`} value={`${getSplittedPrice((sumFiatValue / 100) * percentage, 5, 0)}${symbolCurrency}`} style={{ backgroundColor: colorRow }} />,
  ];
};

export const GridWalletPanel: FC<{ wallet: WalletDivision; setWallet: Dispatch<SetStateAction<WalletDivision | undefined>>; sumFiatValue: number; symbolCurrency: CurrencySymbol }> = ({
  wallet,
  setWallet,
  sumFiatValue,
  symbolCurrency,
}) => {
  const [tempWallet, setTempWallet] = useState(wallet);
  const [isEditing, setEditing] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    if (wallet) {
      setTempWallet(wallet);
    }
  }, [wallet]);

  // @ts-ignore
  const walletData: React.ReactElement<any, any>[] = tempWallet.reduce((r, walletDataRow, index) => {
    return [...r, ...getRow(walletDataRow, sumFiatValue, symbolCurrency, index, isEditing, setTempWallet, showToast)];
  }, []);

  return (
    <>
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body">Allocazione portafoglio:</Typography>
        <div style={{ display: "flex", gap: 20 }}>
          <WarningWalletAllocation wallet={wallet} />
          <EditButtons
            isEditing={isEditing}
            onEdit={() => setEditing(true)}
            onSave={() => {
              setWallet(tempWallet);
              setEditing(false);
              showToast("Modifiche relative all'allocazione del portafoglio salvate correttamente", "success");
            }}
            onCancel={() => {
              setTempWallet(wallet);
              setEditing(false);
              showToast("Hai cancellato le modifiche relative all'allocazione del portafoglio", "warning");
            }}
          />
        </div>
      </div>
      <Spacer size={20} />
      <Grid templateColumns={"150px 126px 126px"} data={[...getHeaders(), ...walletData]} />
    </>
  );
};