import { Toast } from "components/Toast";
import { useToast } from "contexts/ToastContext";
import React from "react";
import styled from "styled-components";
import { Spacer } from "./Spacer";

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <Wrapper>
      {toasts?.map(({ id, type, message }) => (
        <React.Fragment key={`toast-${id}`}>
          <Spacer size={20} />
          <Toast type={type} message={message} />
        </React.Fragment>
      ))}
    </Wrapper>
  );
};
