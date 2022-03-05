import { FC } from "react";
import styled from "styled-components";
import { ToastType } from "types/toastType";
import { errorColor, successColor } from "utils/colors";
import { shadowStyle } from "./ShadowStyle";

const Wrapper = styled.div`
  width: 150px;
  padding: 5px 10px;
  background-color: ${({ color }) => color};
  color: white;
  ${shadowStyle}
`;

export const Toast: FC<{ type: ToastType; message: string }> = ({ type, message }) => {
  return <Wrapper color={type === "error" ? errorColor : type === "success" ? successColor : "white"}>{message}</Wrapper>;
};
