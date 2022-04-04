import { LoadErrorHandler } from "components/LoadErrorHandler";
import { applyActionCode } from "firebase/auth";
import { useToast } from "hooks/useToast";
import { useClientRouter } from "hooks/useClientRouter";
import { useCallback, useEffect, useState } from "react";
import { auth } from "utils/firebase";
import { homePath } from "utils/paths";
import { useAuth } from "hooks/useAuth";

const RegistrationConfirmingPage = () => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  const { setCurrentUser, currentUser } = useAuth();
  const router = useClientRouter();
  const oobCodeQuery = router.query.oobCode;
  const oobCode = typeof oobCodeQuery === "string" ? oobCodeQuery : oobCodeQuery?.[0] || "";

  const { showToast } = useToast();

  const performInitialAction = useCallback(async () => {
    if (oobCode && !hasBeenCalled) {
      setHasBeenCalled(true);
      try {
        await applyActionCode(auth, oobCode);
        if (currentUser) {
          setCurrentUser((user) => ({ verified: true, email: user?.email || null, uid: user?.uid || "" }));
        }
        showToast("Email verificata correttamente", "success");
      } catch {
        showToast("Errore nel verificare l'email", "error");
      } finally {
        router.push(homePath);
      }
    } else {
      router.push(homePath);
    }
  }, [router, oobCode, hasBeenCalled, currentUser, setCurrentUser, showToast]);

  useEffect(() => {
    performInitialAction();
  }, [performInitialAction]);

  return <LoadErrorHandler data={null} error={null} />;
};

export default RegistrationConfirmingPage;