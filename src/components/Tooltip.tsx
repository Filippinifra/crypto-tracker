import React from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import styled from "styled-components";
import { tooltipColor } from "utils/colors";

const Arrow = styled.div`
  width: ${10}px;
  height: ${10}px;

  &:before {
    position: absolute;
    width: ${10}px;
    height: ${10}px;
    left: 0;
    background-color: ${tooltipColor};
    transform: rotate(45deg);
    content: "";
  }
`;

const TooltipWrapper = styled.div`
  border: none;
  padding: 10px;
  &[data-popper-placement^="top"] > ${Arrow} {
    bottom: -${10 / 2}px;
  }
  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: -${10 / 2}px;
  }
  &[data-popper-placement^="left"] > ${Arrow} {
    right: -${10 / 2}px;
  }
  &[data-popper-placement^="right"] > ${Arrow} {
    left: -${10 / 2}px;
  }
  background-color: ${tooltipColor};
  pointer-events: none;
  width: 300px;
`;

interface Props {
  placement?: "top" | "bottom" | "left" | "right";
  content: React.ReactNode;
}

export type TooltipProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "style">;

export const Tooltip: React.FC<TooltipProps> = ({ children, content, placement }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    placement: placement || "top",
    offset: [0, 10],
  });

  return (
    <>
      <div ref={setTriggerRef} style={{ display: "inline-block" }}>
        {children}
      </div>
      {visible && Boolean(content) && (
        <TooltipWrapper ref={setTooltipRef} {...getTooltipProps()}>
          {content}
          <Arrow {...getArrowProps()}></Arrow>
        </TooltipWrapper>
      )}
    </>
  );
};
