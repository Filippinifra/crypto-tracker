import React, { FC, useMemo } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { WalletDivision } from "types/walletDivision";

export const DoughnutChart: FC<{ wallet: WalletDivision }> = ({ wallet }) => {
  const data = useMemo(
    () => ({
      name: "nivo",
      color: "",
      children: wallet.map(({ typologyName, color, percentage }) => {
        return {
          name: typologyName,
          color,
          loc: percentage,
        };
      }),
    }),
    [wallet]
  );

  return (
    <div style={{ width: 300, height: 300 }}>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={5}
        colors={({ data }) => data.color}
        childColor={{
          from: "color",
          modifiers: [["opacity", 0.6]],
        }}
        borderWidth={3}
      />
    </div>
  );
};
