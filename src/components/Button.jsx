import styled from "styled-components";

const ButtonStyled = styled.div`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  -webkit-box-shadow: -2px -2px 0px 1px rgba(0, 0, 0, 0.9);
  box-shadow: -2px -2px 0px 1px rgba(0, 0, 0, 0.9);
  font-size: 14px;
  cursor: pointer;
`;

export const Button = ({ children }) => {
  return <ButtonStyled>{children}</ButtonStyled>;
};
