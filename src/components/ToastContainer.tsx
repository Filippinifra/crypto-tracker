import { Toast } from "components/Toast";
import { useToast } from "contexts/ToastContext";
import { AnimatePresence, motion } from "framer-motion";
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
      <AnimatePresence>
        {toasts?.map(({ id, type, message }) => (
          <React.Fragment key={`toast-wrapper-${id}`}>
            <Spacer size={15} />
            <motion.div layout initial={{ opacity: 0, y: 50, scale: 0.3 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.5 }} id={`toast-${id}`}>
              <Toast type={type} message={message} />
            </motion.div>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
};
