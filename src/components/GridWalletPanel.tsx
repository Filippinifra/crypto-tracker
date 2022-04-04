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

const getHeaders = (isEditing: boolean) => {
  const basicHeaders = [
    <LabelCell value={"Tipologia"} key={`wallet-typology`} isTitle />,
    <LabelCell value={"Percentuale"} key={`wallet-percentage`} isTitle />,
    <LabelCell value={"Corrispettivo"} key={`wallet-value`} isTitle />,
  ];

  return isEditing ? [...basicHeaders, <LabelCell value={" "} key={`wallet-icon`} isTitle />] : basicHeaders;
};

const getRow = ({
  walletPiece,
  sumFiatValue,
  symbolCurrency,
  index,
  isEditing,
  setTempWallet,
  showToast,
}: {
  walletPiece: WalletPiece;
  sumFiatValue: number;
  symbolCurrency: string | undefined;
  index: number;
  isEditing: boolean;
  setTempWallet: React.Dispatch<React.SetStateAction<WalletDivision>>;
  showToast: (message: string, type: ToastType) => void;
  getResponsiveValue: ([smallValue, mediumValue, largeValue]: any[]) => any;
}) => {
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

  const basicRow = [
    isEditing ? (
      <Input
        value={typologyName}
        onChange={(e) => {
          onChangeTypologyName(e.currentTarget.value);
        }}
        key={`wallet-${typologyId}-input`}
        style={{ width: "-webkit-fill-available" }}
      />
    ) : (
      <LabelCell color={colorTypology} key={`wallet-${typologyId}`} value={typologyName} style={{ fontWeight: 800, backgroundColor: colorRow }} />
    ),
    isEditing ? (
      <Input
        value={percentage || ""}
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

  return isEditing
    ? [
        ...basicRow,
        <Icon
          name="delete"
          color={removeColor}
          onClick={onRemoveWalletPiece}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: colorRow }}
          key={`wallet-${typologyId}-deleting`}
        />,
      ]
    : basicRow;
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
    return [...r, ...getRow({ walletPiece: walletDataRow, sumFiatValue, symbolCurrency, index, isEditing, setTempWallet, showToast, getResponsiveValue })];
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
          templateColumns={
            isEditing
              ? getResponsiveValue(["calc(30%) calc(30%) calc(30%) calc(10%)", "150px 126px 106px 20px", "150px 126px 106px 20px"])
              : getResponsiveValue(["3fr 3fr 4fr", "150px 126px 126px", "150px 126px 126px"])
          }
          fullWidth={getResponsiveValue([true, false, false])}
          data={[...getHeaders(isEditing), ...walletData, ...(isEditing ? [<AddWalletPieceIcon key={`wallet-add-coin`} />] : [])]}
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
