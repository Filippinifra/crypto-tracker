import { FC } from "react";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";

const ButtonStyled = styled.div<{ disabled: boolean }>`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  ${shadowStyle}
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#e3e3e3" : "white")};
  height: fit-content;
`;

export const Button: FC<{ onClick: () => void; disabled?: boolean }> = ({ children, onClick, disabled = false, ...others }) => {
  return (
    <ButtonStyled
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      {...others}
    >
      {children}
    </ButtonStyled>
  );
};
