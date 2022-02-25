export const Typography = ({ children, variant }) => {
  const styleVariant = styles[variant];
  return <div style={styleVariant}>{children}</div>;
};

const styles = {
  body: {
    fontSize: 14,
    letterSpacing: 2,
  },
};
