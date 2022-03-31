import { LoadErrorHandler } from "components/LoadErrorHandler";
import { applyActionCode } from "firebase/auth";
import { useToast } from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "utils/firebase";
import { homePath } from "utils/paths";

const RegistrationConfirmedPage = () => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  const router = useRouter();
  const oobCodeQuery = router.query.oobCode;
  const oobCode = typeof oobCodeQuery === "string" ? oobCodeQuery : oobCodeQuery?.[0] || "";

  const { showToast } = useToast();

  const registerEmail = async () => {
    setHasBeenCalled(true);
    try {
      await applyActionCode(auth, oobCode);
      showToast("Email verificata correttamente", "success");
    } catch {
      showToast("Errore nel verificare l'email", "error");
    } finally {
      setTimeout(() => {
        router.push(homePath);
      }, 2000);
    }
  };

  useEffect(() => {
    if (oobCode && !hasBeenCalled) {
      registerEmail();
    }
  }, [registerEmail, oobCode, hasBeenCalled]);

  return <LoadErrorHandler data={null} error={null} />;
};

export default RegistrationConfirmedPage;
