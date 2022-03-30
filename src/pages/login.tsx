import { KeyboardEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { auth } from "utils/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";
import { Spacer } from "components/Spacer";
import { useRouter } from "next/router";
import { useToast } from "hooks/useToast";
import { RoutesHandler } from "components/RoutesHandler";
import {
  getCorrectErrorLabel,
  validateMail,
  validatePassword,
} from "utils/validation";
import { useResponsive } from "hooks/useResponsive";
import { registrationPath } from "utils/paths";
import { toUser } from "mappers/toUser";
import { InfoButton } from "components/InfoButton";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxesWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 40px;
`;

const BoxWrapper = styled.div`
  padding: 40px 0;
  border: 1px solid gray;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  ${shadowStyle};
`;

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);
  const { setCurrentUser } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email) || !validatePassword(password);
  const { getResponsiveValue } = useResponsive();

  const onConfirm = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(toUser(response.user));
    } catch (error) {
      showToast("Errore durante la fase di accesso", "error");
    }
  };

  const onPasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast(
        "Controlla la tua casella di posta per recuperare la password",
        "success"
      );
      setEmail("");
      setPasswordChange(false);
    } catch (error) {
      showToast("Errore durante il recupero della password", "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onConfirm();
    }
  };

  return passwordChange ? (
    <RoutesHandler>
      <PageWrapper>
        <BoxesWrapper style={{ maxWidth: getResponsiveValue([300, 400, 500]) }}>
          <div style={{ display: "flex", gap: 20 }}>
            <InfoButton />
            <Button
              onClick={() => {
                setPasswordChange(false);
              }}
            >
              <Typography variant="body2">Accesso</Typography>
            </Button>
          </div>
          <BoxWrapper>
            <form>
              <Typography variant="title">Recupero Password</Typography>
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
                <Button onClick={onPasswordReset}>
                  <Typography variant="body2">
                    Invia Mail di Recupero
                  </Typography>
                </Button>
              </div>
            </form>
          </BoxWrapper>
        </BoxesWrapper>
      </PageWrapper>
    </RoutesHandler>
  ) : (
    <RoutesHandler>
      <PageWrapper>
        <BoxesWrapper style={{ maxWidth: getResponsiveValue([300, 400, 500]) }}>
          <div style={{ display: "flex", gap: 20 }}>
            <InfoButton />
            <Button
              onClick={() => {
                router.push(registrationPath);
              }}
            >
              <Typography variant="body2">Registrazione</Typography>
            </Button>
          </div>
          <BoxWrapper>
            <form>
              <Typography variant="title">ACCESSO</Typography>
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
                {!password || validatePassword(password)
                  ? ""
                  : getCorrectErrorLabel(password)}
              </Typography>
              <Spacer size={20} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    setPasswordChange(true);
                  }}
                >
                  <Typography variant="body2">Recupera Password</Typography>
                </Button>
              </div>
              <Spacer size={20} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={onConfirm} disabled={disabled}>
                  <Typography variant="body2">Entra</Typography>
                </Button>
              </div>
            </form>
          </BoxWrapper>
        </BoxesWrapper>
      </PageWrapper>
    </RoutesHandler>
  );
};

export default SigninPage;

/* 
<Button onClick={onPasswordReset}>
<Typography variant="body2">Recupera Password</Typography>
</Button> */
