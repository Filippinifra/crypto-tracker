import styled from "styled-components";

const Container = styled.div`
  display: grid;
  border: 1px solid black;
`;

const Item = styled.div`
  padding: 2px 2px 2px 2px;
  font-size: 30px;
  text-align: center;
  background-color: black;
  box-sizing: border-box;
`;

export const Grid = ({ templateColumns, data }) => {
  return (
    <Container
      style={{
        gridTemplateColumns: templateColumns,
      }}
    >
      {data?.map((e) => (
        <Item>{e}</Item>
      ))}
    </Container>
  );
};
