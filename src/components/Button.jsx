import styled from "styled-components";
import { shadowStyle } from "./style";

const ButtonStyled = styled.div`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  ${shadowStyle}
  font-size: 14px;
  cursor: pointer;
`;

export const Button = ({ children }) => {
  return <ButtonStyled>{children}</ButtonStyled>;
};
