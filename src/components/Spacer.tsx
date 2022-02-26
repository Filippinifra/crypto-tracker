import { FC } from "react";

export const Spacer: FC<{ size: number }> = ({ size }) => {
  return <div style={{ height: size }} />;
};
