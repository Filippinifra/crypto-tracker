import styled, { css, keyframes } from "styled-components";

const keyframesShimmer = keyframes`
  0% {
    background-position: -80vw 0;
  }
  100% {
    background-position: 80vw 0;
  }
`;

export const placeholderAnimation = css`
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 80vw 100%;
  animation: ${keyframesShimmer} 2s infinite linear;
`;

export const Placeholder = styled.div<{ height?: number; width?: number }>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  ${placeholderAnimation};
`;
