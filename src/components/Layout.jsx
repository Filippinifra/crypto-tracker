import styled from "styled-components";
import { RefreshButton } from "./Button";
import { Spacer } from "./Spacer";

const Wrapper = styled.div`
  height: 100vh;
  padding: 20px;
`;

export const Layout = ({ children }) => {
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <RefreshButton />
      </div>
      <Spacer size={20} />
      {children}
    </Wrapper>
  );
};
