import { FC, FormEvent, KeyboardEvent } from "react";
import styled from "styled-components";

const InputStyled = styled.input``;

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  value: string | number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ type, placeholder, name, value, onChange, onKeyDown }) => {
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
    />
  );
};
