import { FC } from "react";

export const Typography: FC<{ variant: "body" | "body2" | "title"; style?: React.CSSProperties }> = ({ children, variant, style, ...others }) => {
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
  title: {
    fontSize: 18,
    letterSpacing: 2,
    color: "black",
    fontWeight: 600,
  },
  body: {
    fontSize: 12,
    letterSpacing: 2,
    color: "black",
  },
  body2: {
    fontSize: 10,
    letterSpacing: 2,
    color: "black",
  },
};
