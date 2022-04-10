import { Button } from "components/Button";
import { useAuth } from "hooks/useAuth";
import { Typography } from "components/Typography";
import { auth } from "utils/firebase";
import { useTranslation } from "react-i18next";

export const LogoutButton = () => {
  const { setCurrentUser } = useAuth();
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => {
        auth.signOut();
        setCurrentUser(undefined);
      }}
    >
      <Typography variant="body2">{t("general.logoutButton")}</Typography>
    </Button>
  );
};
