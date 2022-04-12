import { useAuth } from "hooks/useAuth";
import { Typography } from "components/Typography";
import { Spacer } from "components/Spacer";
import { ReloadPageButton } from "components/ReloadPageButton";
import { LogoutButton } from "components/LogoutButton";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";
import { useTranslation } from "react-i18next";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const WaitingRegistrationPage = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  return (
    <CenteredBoxPageLayout
      headerButtons={
        <>
          <ChangeLanguageButton />
          <InfoButton />
          <ReloadPageButton />
          <LogoutButton />
        </>
      }
    >
      <Typography variant="title">{t("waitingRegistration.confirmEmail")}</Typography>
      <Spacer size={40} />
      <Typography variant="body">{t("waitingRegistration.emailSentToConfirm")}</Typography>
      <Spacer size={20} />
      <Typography variant="body">{currentUser?.email}</Typography>
    </CenteredBoxPageLayout>
  );
};

export default WaitingRegistrationPage;
