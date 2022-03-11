import IconMaterial from "@material-ui/core/Icon";
import React, { FC } from "react";
import { IconName } from "types/IconName";

export const Icon: FC<{ style?: React.CSSProperties; name: IconName; color?: string }> = ({ style, name, color }) => {
  return <IconMaterial style={{ fontSize: 18, color: color || "black", ...style }}>{name}</IconMaterial>;
};
