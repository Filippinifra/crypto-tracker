import { Grid } from "components/Grid";
import Image from "next/image";
import React, { Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from "react";
import { CurrencySymbol } from "types/currency";
import { EditingRebalancingCoin, EditingRebalancingCoins, RebalancingCoins } from "types/rebalancingCoins";
import { getFiatRebalanceColor, getPercentageBalanceColor, getPriceChangeColor, greenVariationColor, headerGridCoinColors, redVariationColor, removeColor } from "utils/colors";
import { Typography } from "components/Typography";
import { getSplittedPrice, PLACEHOLDER } from "utils/labels";
import { WalletDivision } from "types/walletDivision";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { TypologyDropdown } from "components/TypologyDropdown";
import { WarningCoinAllocation } from "components/WarningCoinAllocation";
import { useToast } from "hooks/useToast";
import { ToastType } from "types/toastType";
import { Placeholder } from "components/Placeholder";
import { Icon } from "components/Icon";
import { EditButtons } from "components/EditButtons";
import styled from "styled-components";
import { CoinGridWidth } from "utils/dimensions";

const GridScrollWrapper = styled.div`
  width: auto;
  overflow: scroll;
  padding: 5px 0 0 5px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LabelCell: FC<{ value: string | number; color: string; trunc?: boolean; height?: number; textColor?: string; style?: React.CSSProperties }> = ({
  value,
  color,
  trunc = true,
  height,
  textColor,
  style,
}) => {
  const additionalStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: color,
    padding: 10,
    boxSizing: "border-box",
    color: textColor,
    alignItems: "center",
    ...style,
    ...(height && { height, display: "flex", alignItems: "center", justifyContent: "center" }),
    ...(trunc && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }),
  };

  return (
    <Typography variant="body" style={additionalStyle}>
      {value || PLACEHOLDER}
    </Typography>
  );
};

const getHeaders = () => {
  return [
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[0]} value={"Tipologia"} key={`coin-table-type`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[1]} value={"Logo"} key={`coin-table-image`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[1]} value={"Simbolo e nome"} key={`coin-table-name`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[2]} value={"Allocazione"} key={`coin-table-perc`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[2]} value={"Controvalore allocazione"} key={`coin-table-value-for-perc`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[3]} value={"Prezzo"} key={`coin-table-price`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[3]} value={"Variazione 24 ore"} key={`coin-table-price-variation`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[4]} value={"Tokens"} key={`coin-table-holding-token`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[4]} value={"Possesso"} key={`coin-table-holding-in-fiat`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={"Bilanciamento percentuale"} key={`coin-table-perc-balancing`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={"Sbilanciamento valore"} key={`coin-table-value-balancing`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={"Numero coin per ribilancio"} key={`coin-table-coin-balancing`} />,
    <LabelCell height={50} trunc={false} color={headerGridCoinColors[5]} value={" "} key={`coin-table-coin-icons`} />,
  ];
};

const getRow = ({
  coin,
  index,
  wallet,
  symbolCurrency,
  isEditing,
  setTempRebalancing,
  showToast,
}: {
  coin: EditingRebalancingCoin;
  index: number;
  wallet: WalletDivision;
  symbolCurrency: CurrencySymbol;
  isEditing: boolean;
  setTempRebalancing: React.Dispatch<React.SetStateAction<EditingRebalancingCoins>>;
  showToast: (message: string, type: ToastType) => void;
}) => {
  const {
    symbolAndName,
    logoUrl,
    price,
    priceChangePercentage24h,
    allocationPercentage,
    coins,
    holdingInFiat,
    balancingPercentage,
    rebalancingInFiat,
    rebalancingCoins,
    idealAllocationValue,
    typologyId,
    keyElement,
  } = coin;

  const color = index % 2 === 0 ? "#f4f4f5" : "#d4d4d8";

  const colorTypologyText = wallet.find(({ typologyId: walletTypologyId }) => walletTypologyId === typologyId);

  const typologyDrodpownOptions = wallet.map((e) => ({ label: e.typologyName || PLACEHOLDER, value: e, color: e.color }));
  const currentTypology = typologyDrodpownOptions.find(({ value: { typologyId: walletTypologyId } }) => walletTypologyId === typologyId);

  const percentageBalance = !isNaN(balancingPercentage) && isFinite(balancingPercentage) ? `${getSplittedPrice(balancingPercentage, 5, 0)}%` : PLACEHOLDER;

  const onEditTypology = (typologyId: string) => {
    setTempRebalancing((state) => state.map((e) => (e.keyElement === keyElement ? { ...e, typologyId } : e)));
  };

  const onEditAllocation = (allocation: number | null) => {
    setTempRebalancing((state) => state.map((e) => (e.keyElement === keyElement ? { ...e, allocationPercentage: allocation } : e)));
  };

  const onEditCoins = (coins: number | null) => {
    setTempRebalancing((state) => state.map((e) => (e.keyElement === keyElement ? { ...e, coins: coins } : e)));
  };

  const onRemoveCoins = () => {
    setTempRebalancing((state) => state.filter((e) => keyElement !== e.keyElement));
  };

  return [
    isEditing ? (
      <TypologyDropdown
        options={typologyDrodpownOptions}
        value={currentTypology ? currentTypology : null}
        onChange={(e: any) => {
          onEditTypology(e.value.typologyId);
        }}
        key={`coin-table-${keyElement}-typology-editing`}
      />
    ) : (
      <LabelCell
        textColor={colorTypologyText?.color || "black"}
        color={"white"}
        value={currentTypology?.value.typologyName || ""}
        key={`coin-table-${keyElement}-type`}
        style={{ fontWeight: 800, border: `5px solid ${colorTypologyText?.color}`, padding: 5, display: "flex" }}
      />
    ),
    <div style={{ backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center" }} key={`coin-table-${keyElement}-image`}>
      <Image src={logoUrl} alt={keyElement} height={25} width={25} />
    </div>,
    <LabelCell color={color} value={symbolAndName} key={`coin-table-${keyElement}-name`} />,
    isEditing ? (
      <Input
        value={allocationPercentage !== null ? allocationPercentage : ""}
        type="number"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const input = e.currentTarget.value;
          const value = Number(e.currentTarget.value);

          if (value < 0) {
            showToast("Non puoi inserire una percentuale di allocazione negativa", "error");
          } else {
            onEditAllocation(input === "" ? null : value);
          }
        }}
        key={`coin-table-${keyElement}-allocation-editing`}
      />
    ) : (
      <LabelCell color={color} value={`${allocationPercentage}%`} key={`coin-table-${keyElement}-perc`} />
    ),
    <LabelCell color={color} value={`${getSplittedPrice(idealAllocationValue)}${symbolCurrency}`} key={`coin-table-${keyElement}-value-for-perc`} />,
    <LabelCell color={color} value={`${getSplittedPrice(price)}${symbolCurrency}`} key={`coin-table-${keyElement}-price`} />,
    <LabelCell
      color={getPriceChangeColor(priceChangePercentage24h, color)}
      textColor={priceChangePercentage24h < 0 ? redVariationColor : greenVariationColor}
      value={`${getSplittedPrice(priceChangePercentage24h, 3, 2, true)}%`}
      key={`coin-table-${keyElement}-price-variation`}
    />,
    isEditing ? (
      <Input
        value={coins !== null ? coins : ""}
        type="number"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const input = e.currentTarget.value;
          const value = Number(e.currentTarget.value);

          if (value < 0) {
            showToast("Non puoi avere un numero negativo di monete", "error");
          } else {
            onEditCoins(input === "" ? null : value);
          }
        }}
        key={`coin-table-${keyElement}-coins-editing`}
      />
    ) : (
      <LabelCell color={color} value={coins || 0} key={`coin-table-${keyElement}-holding-token`} />
    ),
    <LabelCell color={color} value={`${getSplittedPrice(holdingInFiat, 5, 2)}${symbolCurrency}`} key={`coin-table-${keyElement}-holding-in-fiat`} />,
    <LabelCell color={getPercentageBalanceColor(balancingPercentage)} value={percentageBalance} key={`coin-table-${keyElement}-perc-balancing`} />,
    <LabelCell color={getFiatRebalanceColor(rebalancingInFiat)} value={`${getSplittedPrice(rebalancingInFiat, 5, 2)}${symbolCurrency}`} key={`coin-table-${keyElement}-value-balancing`} />,
    <LabelCell color={color} value={getSplittedPrice(rebalancingCoins)} key={`coin-table-${keyElement}-coin-balancing`} />,
    isEditing ? (
      <div style={{ backgroundColor: color, height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} key={`coin-table-${keyElement}-delete-icon`}>
        <Icon name="delete" color={removeColor} style={{ cursor: "pointer" }} onClick={onRemoveCoins} />
      </div>
    ) : (
      <div style={{ backgroundColor: color }} key={`coin-table-${keyElement}-empty-space`}></div>
    ),
  ];
};

const reorderCoins = (coins: RebalancingCoins, wallet: WalletDivision) => {
  const sortByAllocation = coins.sort(({ allocationPercentage: allocationA }, { allocationPercentage: allocationB }) => allocationB - allocationA);
  // @ts-ignore
  const sortedByTypology: RebalancingCoins = wallet.reduce((r, { typologyId: walletTypologyId }) => {
    return [...r, ...sortByAllocation.filter(({ typologyId }) => walletTypologyId === typologyId)];
  }, []);

  const noTypologyCoins = coins.filter(({ typologyId }) => typologyId === "");

  return [...sortedByTypology, ...noTypologyCoins];
};

export const GridCoinsPanel: FC<{
  rebalancingCoins: RebalancingCoins;
  wallet: WalletDivision;
  symbolCurrency: CurrencySymbol;
  setRebalancingCoins: (rebalancingCoins: RebalancingCoins) => void;
  detailedCoinsLoading: boolean;
  isEditing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
}> = ({ rebalancingCoins, wallet, symbolCurrency, setRebalancingCoins, detailedCoinsLoading, isEditing, setEditing }) => {
  const [tempRebalancing, setTempRebalancing] = useState<EditingRebalancingCoins>(reorderCoins(rebalancingCoins, wallet));

  const { showToast } = useToast();

  useEffect(() => {
    const hasChangedSomething = JSON.stringify(rebalancingCoins) !== JSON.stringify(tempRebalancing);

    if (!hasChangedSomething) {
      setTempRebalancing(rebalancingCoins);
    }

    if (!isEditing && hasChangedSomething) {
      setTempRebalancing(reorderCoins(rebalancingCoins, wallet));
    }
  }, [rebalancingCoins, isEditing, wallet]);

  // @ts-ignore
  const coinsData: ReactElement<any, any>[] = tempRebalancing.reduce((r, coinData, index) => {
    return [...r, ...getRow({ coin: coinData, index, wallet, symbolCurrency, isEditing, setTempRebalancing, showToast })];
  }, []);

  const normalizeAndSetCoins = () => {
    const hasChangedSomething = JSON.stringify(rebalancingCoins) !== JSON.stringify(tempRebalancing);

    if (hasChangedSomething) {
      const normalizedCoins = tempRebalancing.map((e) => ({ ...e, allocationPercentage: e.allocationPercentage || 0, coins: e.coins || 0 }));
      setRebalancingCoins(normalizedCoins);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: CoinGridWidth }}>
        <Typography variant="body">Allocazione asset e ribilanciamento:</Typography>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {!detailedCoinsLoading && <WarningCoinAllocation wallet={wallet} coins={tempRebalancing} />}
          <EditButtons
            isEditing={isEditing}
            onEdit={() => {
              setEditing(true);
            }}
            onSave={() => {
              setEditing(false);
              normalizeAndSetCoins();
            }}
            onCancel={() => {
              setEditing(false);
              showToast("Hai cancellato le modifiche alle monete", "warning");
            }}
          />
        </div>
      </div>
      <Spacer size={20} />
      <GridScrollWrapper>
        {detailedCoinsLoading ? (
          <Placeholder height={1000} width={CoinGridWidth} />
        ) : (
          <>
            <Grid templateColumns={"150px 58px 160px 100px 110px 90px 85px 80px 90px 120px 120px 120px 20px"} data={[...getHeaders(), ...coinsData]} />
            {!tempRebalancing.length && (
              <>
                <Spacer size={20} />
                <Typography variant="body">Inserisci almeno una moneta</Typography>
              </>
            )}
            {/* KEEP This to allow dropdown to have space to be opened for last one coin */}
            {isEditing && <Spacer size={40 * wallet.length + 50} />}
          </>
        )}
      </GridScrollWrapper>
    </>
  );
};
