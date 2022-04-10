import { KeyboardEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { analytics, auth } from "utils/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useClientRouter } from "hooks/useClientRouter";
import { useToast } from "hooks/useToast";
import { getCorrectPasswordErrorLabel, validateMail, validatePassword } from "utils/validation";
import { loginPath } from "utils/paths";
import { toUser } from "mappers/toUser";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";
import { setUserId as setAnalyticsUserId } from "firebase/analytics";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useAuth();
  const router = useClientRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email) || !validatePassword(password);

  const onConfirm = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (analytics) {
        setAnalyticsUserId(analytics, response.user.uid);
      }
      setCurrentUser(toUser(response.user));
      sendEmailVerification(response.user);
    } catch (error) {
      showToast("Errore durante la fase di registrazione", "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onConfirm();
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
            <Typography variant="body2">Accesso</Typography>
          </Button>
        </>
      }
    >
      <form>
        <Typography variant="title">REGISTRAZIONE</Typography>
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
        <Typography variant="body">Password</Typography>
        <Spacer size={10} />
        <Input
          type="password"
          value={password}
          placeholder="Inserisci la password"
          name="psw"
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
        <Spacer size={40} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={onConfirm} disabled={disabled}>
            <Typography variant="body2">Registrati</Typography>
          </Button>
        </div>
      </form>
    </CenteredBoxPageLayout>
  );
};

export default SignupPage;
