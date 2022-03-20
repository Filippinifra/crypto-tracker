import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";

const colorGrid = "#7D7D8C";

const Container = styled.div`
  display: grid;
  border: 1px solid ${colorGrid};
  width: fit-content;
  ${shadowStyle}
`;

export const Grid: FC<{ fullWidth?: boolean; templateColumns: string; data: (ReactElement<any, any> | Element | FC)[] }> = ({ fullWidth, templateColumns, data }) => {
  return (
    <Container
      style={{
        gridTemplateColumns: templateColumns,
        ...(fullWidth && { width: "100%" }),
      }}
    >
      {data?.map((e) => e)}
    </Container>
  );
};
