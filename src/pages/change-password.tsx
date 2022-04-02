import { KeyboardEvent, useState } from "react";
import { auth } from "utils/firebase";
import { confirmPasswordReset } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useRouter } from "next/router";
import { useToast } from "hooks/useToast";
import { getCorrectPasswordErrorLabel, validatePassword } from "utils/validation";
import { homePath, loginPath } from "utils/paths";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";

const SigninPage = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showToast } = useToast();
  const disabled = !validatePassword(password);
  const oobCodeQuery = router.query.oobCode;
  const oobCode = typeof oobCodeQuery === "string" ? oobCodeQuery : oobCodeQuery?.[0] || "";

  const onPasswordReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, password);
      showToast(`La password è stata cambiata correttamente`, "success");
      router.push(loginPath);
    } catch (error) {
      showToast("Errore durante il salvataggio della nuova password", "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onPasswordReset();
    }
  };

  if (!oobCode) {
    router.push(homePath);
  }

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
      <Typography variant="title">CAMBIO PASSWORD</Typography>
      <Spacer size={40} />
      <Typography variant="body">Nuova password</Typography>
      <Spacer size={10} />
      <Input
        type="password"
        placeholder="Inserisci la nuova password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        autocomplete={"password"}
        onKeyDown={handleKeyPress}
      />
      <Spacer size={5} />
      <Typography variant="error" style={{ height: 10 }}>
        {!password || validatePassword(password) ? "" : getCorrectPasswordErrorLabel(password)}
      </Typography>
      <Spacer size={25} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onPasswordReset} disabled={disabled}>
          <Typography variant="body2">Conferma nuova password</Typography>
        </Button>
      </div>
    </CenteredBoxPageLayout>
  );
};

export default SigninPage;
