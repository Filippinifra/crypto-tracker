import { FC } from "react";
import styled from "styled-components";
import { ToastType } from "types/toastType";
import { errorColor, successColor } from "utils/colors";
import { shadowStyle } from "./ShadowStyle";
import { Typography } from "./Typography";

const Wrapper = styled.div`
  width: 150px;
  padding: 5px 10px;
  border: 7px solid ${({ color }) => color};
  ${shadowStyle}
`;

export const Toast: FC<{ type: ToastType; message: string }> = ({ type, message }) => {
  return (
    <Wrapper color={type === "error" ? errorColor : type === "success" ? successColor : "white"}>
      <Typography variant="body" style={{ ...(type === "error" && { color: "white" }) }}>
        {message}
      </Typography>
    </Wrapper>
  );
};
