import { Button } from "components/Button";
import { useAuth } from "hooks/useAuth";
import { Typography } from "components/Typography";
import { auth } from "utils/firebase";

export const LogoutButton = () => {
  const { setCurrentUser } = useAuth();

  return (
    <Button
      onClick={() => {
        auth.signOut();
        setCurrentUser(undefined);
      }}
    >
      <Typography variant="body2">Esci</Typography>
    </Button>
  );
};
