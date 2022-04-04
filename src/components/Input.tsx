import { FC, FormEvent, KeyboardEvent } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  padding: 8px;
  letter-spacing: 2px;
  font-size: 12px;
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
