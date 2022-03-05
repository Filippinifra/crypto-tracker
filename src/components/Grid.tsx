import { FC } from "react";
import styled from "styled-components";
import { shadowStyle } from "./ShadowStyle";

const colorGrid = "#7D7D8C";

const Container = styled.div`
  display: grid;
  border: 1px solid ${colorGrid};
  width: fit-content;
  ${shadowStyle}
`;

const Item = styled.div`
  padding: 2px 2px 2px 2px;
  font-size: 30px;
  text-align: center;
  background-color: ${colorGrid};
  box-sizing: border-box;
`;

export const Grid: FC<{ templateColumns: string; data: any[] }> = ({ templateColumns, data }) => {
  return (
    <Container
      style={{
        gridTemplateColumns: templateColumns,
      }}
    >
      {data?.map((e) => (
        <Item key={e}>{e}</Item>
      ))}
    </Container>
  );
};
