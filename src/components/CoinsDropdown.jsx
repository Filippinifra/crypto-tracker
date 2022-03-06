import { useMemo, useState } from "react";
import Select from "react-select";
import { shadowStyle } from "components/ShadowStyle";

export const CoinsDropdown = ({ options, value, onChange, ...others }) => {
  const [input, setInput] = useState("");

  const filteredOptions = useMemo(() => {
    if (!input) {
      return options;
    }

    const filteredOptions = options.filter(({ value: { symbol, id, name } }) => {
      const upperInput = input.toUpperCase();
      const symbolIncluded = symbol.toUpperCase().includes(upperInput);
      const idIncluded = id.toUpperCase().includes(upperInput);
      const nameIncluded = name.toUpperCase().includes(upperInput);

      return symbolIncluded || idIncluded || nameIncluded;
    });

    const sortedByLengthOptions = filteredOptions.sort(({ value: { symbol: labelA } }, { value: { symbol: labelB } }) => labelA.length - labelB.length);

    return sortedByLengthOptions;
  }, [input, options]);

  const slicedOptions = useMemo(() => filteredOptions?.slice(0, 100), [filteredOptions]);

  return (
    <Select
      value={value}
      onChange={(e) => {
        if (e) {
          onChange(e);
        }
      }}
      options={slicedOptions}
      onInputChange={setInput}
      placeholder={"Scrivi o scegli una coin"}
      {...others}
      styles={{
        container: (props) => ({ ...props, border: "1px solid black", ...shadowStyle }),
        control: () => ({
          display: "flex",
        }),
        option: (styles, { data, isSelected }) => ({
          ...styles,
          backgroundColor: isSelected ? "#CCCCCC" : "white",
          "&:hover": {
            backgroundColor: "#EBEBEB",
          },
        }),
      }}
    />
  );
};
