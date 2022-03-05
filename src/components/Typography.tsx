import { FC } from "react";

export const Typography: FC<{ variant: string; style?: React.CSSProperties }> = ({ children, variant, style, ...others }) => {
  const styleVariant = styles[variant];
  return (
    <div style={{ ...styleVariant, ...style }} {...others}>
      {children}
    </div>
  );
};

type tStyle = {
  [key: string]: object;
};

const styles: tStyle = {
  body: {
    fontFamily: "Roboto",
    fontSize: 12,
    letterSpacing: 2,
  },
};
