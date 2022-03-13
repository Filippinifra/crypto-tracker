import { FC } from "react";
import styled from "styled-components";
import { ToastType } from "types/toastType";
import { errorColor, successColor, warningColor } from "utils/colors";
import { Icon } from "components/Icon";
import { shadowStyle } from "components/ShadowStyle";
import { Typography } from "components/Typography";

const Wrapper = styled.div`
  width: 200px;
  padding: 5px 10px;
  border: 7px solid ${({ color }) => color};
  ${shadowStyle}
  background-color: white;
`;

const getColor = (type: ToastType) => {
  if (type === "error") {
    return errorColor;
  }
  if (type === "success") {
    return successColor;
  }
  return warningColor;
};

const getIconName = (type: ToastType) => {
  if (type === "error") {
    return "error";
  }
  if (type === "success") {
    return "check_circle";
  }
  return "priority_high";
};

export const Toast: FC<{ type: ToastType; message: string }> = ({ type, message }) => {
  return (
    <Wrapper color={getColor(type)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center" }}>
        <Icon name={getIconName(type)} color={getColor(type)} />
        <Typography variant="body2">{message}</Typography>
      </div>
    </Wrapper>
  );
};
