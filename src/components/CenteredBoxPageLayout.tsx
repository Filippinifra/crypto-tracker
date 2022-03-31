import { useResponsive } from "hooks/useResponsive";
import { FC, ReactElement } from "react";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxesWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 40px;
`;

const BoxWrapper = styled.div`
  padding: 40px 0;
  border: 1px solid gray;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  ${shadowStyle};
`;

export const CenteredBoxPageLayout: FC<{ headerButtons: Element | ReactElement<any, any> }> = ({ children, headerButtons }) => {
  const { getResponsiveValue } = useResponsive();

  return (
    <PageWrapper>
      <BoxesWrapper style={{ maxWidth: getResponsiveValue([300, 400, 500]) }}>
        <div style={{ display: "flex", gap: 20 }}>{headerButtons}</div>
        <BoxWrapper>{children}</BoxWrapper>
      </BoxesWrapper>
    </PageWrapper>
  );
};
