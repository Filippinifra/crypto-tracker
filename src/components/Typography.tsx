import { FC } from "react";
import { errorColor } from "utils/colors";

export const Typography: FC<{ variant: "body" | "body2" | "title" | "error"; style?: React.CSSProperties; component?: string }> = ({ children, variant, style, component, ...others }) => {
  const styleVariant = styles[variant];
  const Component = (component || "div") as any;

  return (
    <Component style={{ ...styleVariant, ...style }} {...others}>
      {children}
    </Component>
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
  error: {
    fontSize: 8,
    color: errorColor,
  },
};
