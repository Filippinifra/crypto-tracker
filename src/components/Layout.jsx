import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "./Button";
import { Spacer } from "./Spacer";

const Wrapper = styled.div`
  height: 100vh;
  padding: 20px;
`;

export const Layout = ({ children }) => {
  const router = useRouter();

  const refreshData = () => {
    router.reload(window.location.pathname);
  };

  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={refreshData}>Refresh</Button>
      </div>
      <Spacer size={20} />
      {children}
    </Wrapper>
  );
};
