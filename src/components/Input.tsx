import { FC, FormEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { isSafari } from "utils/browser";

const InputStyled = styled.input`
  padding: ${isSafari ? "7px 7px" : "8px 9px"};
  letter-spacing: 2px;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 4px;
`;

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  value: string | number;
  style?: React.CSSProperties;
  autocomplete?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ type, placeholder, name, value, style, autocomplete, onChange, onKeyDown }) => {
  return (
    <InputStyled
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
      onKeyDown={(e) => {
        if (onKeyDown) {
          onKeyDown(e);
        }
      }}
      style={style}
      autoComplete={autocomplete}
    />
  );
};
