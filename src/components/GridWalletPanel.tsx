import React, { FC, useEffect, useState } from "react";
import { CurrencySymbol } from "types/currency";
import { WalletDivision, WalletPiece } from "types/walletDivision";
import { addColor, headerGridWalletColor, pieColorsDark, removeColor } from "utils/colors";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { Grid } from "components/Grid";
import { Typography } from "components/Typography";
import { WarningWalletAllocation } from "components/WarningWalletAllocation";
import { Spacer } from "components/Spacer";
import { EditButtons } from "components/EditButtons";
import { useToast } from "hooks/useToast";
import { Input } from "components/Input";
import { ToastType } from "types/toastType";
import { Icon } from "components/Icon";
import { v4 as uuidv4 } from "uuid";
import { useResponsive } from "hooks/useResponsive";

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

  const onRemoveWalletPiece = () => {
    setTempWallet((walletPieces) => walletPieces.filter((wp) => wp.typologyId !== typologyId));
  };

  return [
    isEditing ? (
      <div style={{ position: "relative", width: "100%" }} key={`wallet-${typologyId}-input-and-deleting`}>
        <div style={{ position: "absolute", top: 10, left: -25 }}>
          <Icon name="remove_circle" color={removeColor} style={{ cursor: "pointer" }} onClick={onRemoveWalletPiece} />
        </div>
        <Input
          value={typologyName}
          onChange={(e) => {
            onChangeTypologyName(e.currentTarget.value);
          }}
          key={`wallet-${typologyId}-input`}
          style={{ width: "-webkit-fill-available" }}
        />
      </div>
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

export const GridWalletPanel: FC<{ wallet: WalletDivision; setWallet: (newWallet: WalletDivision) => void; sumFiatValue: number; symbolCurrency: CurrencySymbol }> = ({
  wallet,
  setWallet,
  sumFiatValue,
  symbolCurrency,
}) => {
  const [tempWallet, setTempWallet] = useState(wallet);
  const [isEditing, setEditing] = useState(false);

  const { getResponsiveValue } = useResponsive();
  const { showToast } = useToast();

  useEffect(() => {
    if (wallet && !isEditing) {
      setTempWallet(wallet);
    }
  }, [wallet, isEditing]);

  // @ts-ignore
  const walletData: React.ReactElement<any, any>[] = tempWallet.reduce((r, walletDataRow, index) => {
    return [...r, ...getRow(walletDataRow, sumFiatValue, symbolCurrency, index, isEditing, setTempWallet, showToast)];
  }, []);

  const addNewWalletPiece = () => {
    const id = uuidv4();

    const walletLenght = tempWallet.length;

    setTempWallet((tempWallet) => [...(tempWallet || []), { color: pieColorsDark[walletLenght], percentage: 0, typologyId: id, typologyName: "" }]);
  };

  const AddWalletPieceIcon: FC = () => {
    return (
      <div style={{ padding: 9, display: "flex", alignItems: "center" }}>
        <Icon name="add_circle" color={addColor} style={{ cursor: "pointer" }} onClick={addNewWalletPiece} />
      </div>
    );
  };

  return (
    <>
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body">Allocazione portafoglio:</Typography>
        <div style={{ display: "flex", gap: 20 }}>
          {Boolean(tempWallet.length) && <WarningWalletAllocation wallet={tempWallet} />}
          <EditButtons
            isEditing={isEditing}
            onEdit={() => {
              setEditing(true);
            }}
            onSave={() => {
              setWallet(tempWallet);
              setEditing(false);
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
      <div style={{ padding: "0 0 0 5px" }}>
        <Grid
          templateColumns={getResponsiveValue(["1fr 1fr 1fr", "150px 126px 126px", "150px 126px 126px"])}
          fullWidth={getResponsiveValue([true, false, false])}
          data={[...getHeaders(), ...walletData, ...(isEditing ? [<AddWalletPieceIcon key={`wallet-add-coin`} />] : [])]}
        />
      </div>
      {!tempWallet.length && (
        <>
          <Spacer size={20} />
          <Typography variant="body">Inserisci almeno una tipologia</Typography>
        </>
      )}
    </>
  );
};
