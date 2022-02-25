import styled from "styled-components";
import { RefreshButton } from "./Button";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadErrorHandler = ({ data, error, children }) => {
  if (!data && !error) {
    return <Wrapper style={{ backgroundColor: "#f3ea5f", color: "black" }}>.. Loading ..</Wrapper>;
  }

  if (error) {
    return (
      <Wrapper style={{ backgroundColor: "#ff3f3f", color: "white", display: "flex", flexDirection: "column", gap: 30 }}>
        <div>Error!</div>
        <RefreshButton />
      </Wrapper>
    );
  }

  return children;
};
