import { KeyboardEvent, useState } from "react";
import { auth } from "utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useClientRouter } from "hooks/useClientRouter";
import { useToast } from "hooks/useToast";
import { validateMail } from "utils/validation";
import { loginPath } from "utils/paths";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useClientRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email);

  const onPasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast(`Una email è stata inviata a ${email} per il recupero della password`, "success");
      router.push(loginPath);
    } catch (error) {
      showToast("Errore durante il recupero della password", "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onPasswordReset();
    }
  };

  return (
    <CenteredBoxPageLayout
      headerButtons={
        <>
          <InfoButton />
          <Button
            onClick={() => {
              router.push(loginPath);
            }}
          >
            <Typography variant="body2">Torna alla pagina di accesso</Typography>
          </Button>
        </>
      }
    >
      <Typography variant="title">RECUPERO PASSWORD</Typography>
      <Spacer size={40} />
      <Typography variant="body">Email</Typography>
      <Spacer size={10} />
      <Input
        type="text"
        placeholder="Inserisci la email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        autocomplete={"email"}
        onKeyDown={handleKeyPress}
      />
      <Spacer size={5} />
      <Typography variant="error" style={{ height: 10 }}>
        {!email || validateMail(email) ? "" : "Email non valida"}
      </Typography>
      <Spacer size={25} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onPasswordReset} disabled={disabled}>
          <Typography variant="body2">Invia Mail di Recupero</Typography>
        </Button>
      </div>
    </CenteredBoxPageLayout>
  );
};

export default RecoverPasswordPage;
