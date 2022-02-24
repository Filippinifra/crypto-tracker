import { useMemo, useState } from "react";
import Select from "react-select";

export const Dropdown = ({ options, value, onChange, ...others }) => {
  const [input, setInput] = useState("");

  const filteredOptions = useMemo(() => {
    if (!input) {
      return options;
    }

    const filteredOptions = options.filter(({ label }) => label.includes(input.toUpperCase()));
    const sortedByLengthOptions = filteredOptions.sort(({ value: { currency: labelA } }, { value: { currency: labelB } }) => labelA.length - labelB.length);

    return sortedByLengthOptions;
  }, [input]);

  const slicedOptions = useMemo(() => filteredOptions.slice(0, 100), [filteredOptions]);

  return <Select value={value} onChange={onChange} options={slicedOptions} onInputChange={setInput} {...others} />;
};