import IconMaterial from "@material-ui/core/Icon";
import React, { FC } from "react";
import { IconName } from "types/IconName";

export const Icon: FC<{ style?: React.CSSProperties; name: IconName; color?: string; onClick: () => void }> = ({ style, name, color, onClick }) => {
  return (
    <IconMaterial onClick={onClick} style={{ fontSize: 16, color: color || "black", ...style }}>
      {name}
    </IconMaterial>
  );
};
