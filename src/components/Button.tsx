import { FC } from "react";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";

const ButtonStyled = styled.div`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  ${shadowStyle}
  font-size: 14px;
  cursor: pointer;
  background-color: white;
  height: fit-content;
`;

export const Button: FC<{ onClick: () => void }> = ({ children, ...others }) => {
  return <ButtonStyled {...others}>{children}</ButtonStyled>;
};
