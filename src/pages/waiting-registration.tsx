import { useAuth } from "hooks/useAuth";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { ReloadPageButton } from "components/ReloadPageButton";
import { LogoutButton } from "components/LogoutButton";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";

const WaitingRegistrationPage = () => {
  const { currentUser } = useAuth();

  return (
    <CenteredBoxPageLayout
      headerButtons={
        <>
          <InfoButton />
          <ReloadPageButton />
          <LogoutButton />
        </>
      }
    >
      <Typography variant="title">CONFERMA EMAIL</Typography>
      <Spacer size={40} />
      <Typography variant="body">{"Ti abbiamo inviato una mail di conferma all'indirizzo email"}</Typography>
      <Spacer size={20} />
      <Typography variant="body">{currentUser?.email}</Typography>
    </CenteredBoxPageLayout>
  );
};

export default WaitingRegistrationPage;