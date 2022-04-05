import Select from "react-select";

export const TypologyDropdown = ({ options, value, onChange, ...others }) => {
  return (
    <Select
      value={value}
      onChange={(e) => {
        if (e) {
          onChange(e);
        }
      }}
      options={options}
      placeholder={"Tipologia"}
      {...others}
      styles={{
        container: (props) => ({ ...props, border: "1px solid black", margin: 2, height: 30 }),
        control: () => ({
          display: "flex",
          padding: 0,
          margin: 0,
          height: 30,
          fontSize: 12,
          fontFamily: "Roboto",
          letterSpacing: 2,
          fontWeight: 600,
        }),
        option: (styles, { data, isSelected }) => ({
          ...styles,
          color: data.color || "black",
          backgroundColor: isSelected ? "#CCCCCC" : "white",
          fontSize: 12,
          fontFamily: "Roboto",
          letterSpacing: 2,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#EBEBEB",
          },
        }),
        singleValue: (styles, { data }) => ({
          ...styles,
          color: data?.color || "black",
        }),
        input: (styles) => ({
          ...styles,
          fontSize: 10,
        }),
        valueContainer: (styles) => ({ ...styles, padding: "0px 6px", height: 28 }),
      }}
    />
  );
};
