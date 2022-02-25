export const Typography = ({ children, variant, style, ...others }) => {
  const styleVariant = styles[variant];
  return (
    <div style={{ ...styleVariant, ...style }} {...others}>
      {children}
    </div>
  );
};

const styles = {
  body: {
    fontSize: 14,
    letterSpacing: 2,
  },
};
