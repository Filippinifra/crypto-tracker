import { LoadErrorHandler } from "components/LoadErrorHandler";
import { applyActionCode } from "firebase/auth";
import { useToast } from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "utils/firebase";
import { homePath } from "utils/paths";
import { useAuth } from "hooks/useAuth";

const RegistrationConfirmingPage = () => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  const { setCurrentUser } = useAuth();
  const router = useRouter();
  const oobCodeQuery = router.query.oobCode;
  const oobCode = typeof oobCodeQuery === "string" ? oobCodeQuery : oobCodeQuery?.[0] || "";

  const { showToast } = useToast();

  const registerEmail = async () => {
    setHasBeenCalled(true);
    try {
      await applyActionCode(auth, oobCode);
      setCurrentUser((user) => ({ verified: true, email: user?.email || null, uid: user?.uid || "" }));
      showToast("Email verificata correttamente", "success");
    } catch {
      showToast("Errore nel verificare l'email", "error");
    } finally {
      router.push(homePath);
    }
  };

  useEffect(() => {
    if (oobCode && !hasBeenCalled) {
      registerEmail();
    } else {
      router.push(homePath);
    }
  }, [registerEmail, oobCode, hasBeenCalled]);

  return <LoadErrorHandler data={null} error={null} />;
};

export default RegistrationConfirmingPage;
