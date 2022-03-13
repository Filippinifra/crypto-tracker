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
        container: (props) => ({ ...props, border: "1px solid black", height: 34 }),
        control: () => ({
          display: "flex",
        }),
        option: (styles, { data, isSelected }) => ({
          ...styles,
          color: data.color || "black",
          backgroundColor: isSelected ? "#CCCCCC" : "white",
          "&:hover": {
            backgroundColor: "#EBEBEB",
          },
        }),
        singleValue: (styles, { data }) => ({
          ...styles,
          color: data?.color || "black",
        }),
      }}
    />
  );
};
