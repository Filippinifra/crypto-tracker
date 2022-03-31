import { LoadErrorHandler } from "components/LoadErrorHandler";
import { applyActionCode } from "firebase/auth";
import { useToast } from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "utils/firebase";
import { homePath } from "utils/paths";

const RegistrationConfirmedPage = () => {
  const router = useRouter();
  const oobCodeQuery = router.query.oobCode;
  const oobCode = typeof oobCodeQuery === "string" ? oobCodeQuery : oobCodeQuery?.[0] || "";

  const { showToast } = useToast();

  const registerEmail = async () => {
    try {
      await applyActionCode(auth, oobCode);
      showToast("Email verificata correttamente", "success");
    } catch {
      showToast("Errore nel verificare l'email", "error");
    } finally {
      router.push(homePath);
    }
  };

  useEffect(() => {
    if (oobCode) {
      registerEmail();
    }
  }, [registerEmail, oobCode]);

  return <LoadErrorHandler data={null} error={null} />;
};

export default RegistrationConfirmedPage;
