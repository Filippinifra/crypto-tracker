import { useAuth } from "hooks/useAuth";
import { Typography } from "components/Typography";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";
import { Spacer } from "components/Spacer";
import { useRouter } from "next/router";
import { useToast } from "hooks/useToast";
import { RoutesHandler } from "components/RoutesHandler";
import { useResponsive } from "hooks/useResponsive";

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

const ConfirmationPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const { getResponsiveValue } = useResponsive();

  return (
    <RoutesHandler>
      <PageWrapper>
        <BoxesWrapper style={{ maxWidth: getResponsiveValue([300, 400, 500]) }}>
          <BoxWrapper>
            <Typography variant="title">CONFERMA EMAIL</Typography>
            <Spacer size={40} />
            <Typography variant="body">
              Ti abbiamo inviato una mail di conferma all'indirizzo
              {currentUser?.email}
            </Typography>
          </BoxWrapper>
        </BoxesWrapper>
      </PageWrapper>
    </RoutesHandler>
  );
};

export default ConfirmationPage;
