import { FC, FormEvent } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  font-family: "Roboto";
`;

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  value: any;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ type, placeholder, name, value, onChange }) => {
  return <InputStyled type={type} placeholder={placeholder} value={value} name={name} onChange={(e) => onChange(e)} />;
};
