import { KeyboardEvent, useState } from "react";
import { auth } from "utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";
import { Spacer } from "components/Spacer";
import { useRouter } from "next/router";
import { useToast } from "hooks/useToast";
import { RoutesHandler } from "components/RoutesHandler";
import { validateMail } from "utils/validation";
import { useResponsive } from "hooks/useResponsive";
import { loginPath } from "utils/paths";
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
  const router = useRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email);
  const { getResponsiveValue } = useResponsive();

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
    <RoutesHandler>
      <PageWrapper>
        <BoxesWrapper style={{ maxWidth: getResponsiveValue([300, 400, 500]) }}>
          <div style={{ display: "flex", gap: 20 }}>
            <InfoButton />
            <Button
              onClick={() => {
                router.push(loginPath);
              }}
            >
              <Typography variant="body2">Torna alla pagina di accesso</Typography>
            </Button>
          </div>
          <BoxWrapper>
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
              <Button onClick={onPasswordReset} disabled={disabled}>
                <Typography variant="body2">Invia Mail di Recupero</Typography>
              </Button>
            </div>
          </BoxWrapper>
        </BoxesWrapper>
      </PageWrapper>
    </RoutesHandler>
  );
};

export default SigninPage;
