import { KeyboardEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { auth } from "utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";
import { Spacer } from "components/Spacer";
import { useRouter } from "next/router";
import { useToast } from "hooks/useToast";
import { RoutesHandler } from "components/RoutesHandler";
import { getCorrectErrorLabel, validateMail, validatePassword } from "utils/validation";
import { useResponsive } from "hooks/useResponsive";

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
  const { setCurrentUser } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email) || !validatePassword(password);
  const { getResponsiveValue } = useResponsive();

  const onConfirm = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(response.user);
    } catch (error) {
      showToast("Errore durante la fase di accesso", "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onConfirm();
    }
  };

  return (
    <RoutesHandler>
      <PageWrapper>
        <BoxesWrapper style={{ maxWidth: getResponsiveValue([300, 400, 500]) }}>
          <Button
            onClick={() => {
              router.push("/registration");
            }}
          >
            <Typography variant="body2">Registrazione</Typography>
          </Button>
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
                {!password || validatePassword(password) ? "" : getCorrectErrorLabel(password)}
              </Typography>
              <Spacer size={40} />
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
