import { FC, FormEvent } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ type, placeholder, name, onChange }) => {
  return <input type={type} placeholder={placeholder} name={name} onChange={(e) => onChange(e)} />;
};
