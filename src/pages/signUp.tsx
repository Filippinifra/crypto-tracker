import { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { auth } from "utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import styled from "styled-components";
import { shadowStyle } from "components/ShadowStyle";
import { Spacer } from "components/Spacer";
import { useRouter } from "next/router";
import { useToast } from "contexts/ToastContext";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxesWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 20px;
`;

const BoxWrapper = styled.div`
  padding: 40px 20px;
  border: 1px solid gray;
  text-align: center;
  width: 100%;
  ${shadowStyle};
`;

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useAuth();
  const router = useRouter();

  const { showToast } = useToast();

  const onConfirm = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(response.user);
    } catch (error) {
      showToast("Errore durante la fase di registrazione", "error");
    }
  };

  return (
    <PageWrapper>
      <BoxesWrapper>
        <Button
          onClick={() => {
            router.push("/signin");
          }}
        >
          <Typography variant="body2">Sono già registrato</Typography>
        </Button>
        <BoxWrapper>
          <Typography variant="title">REGISTRAZIONE</Typography>
          <Spacer size={20} />
          <Typography variant="body">Email</Typography>
          <Spacer size={5} />
          <Input
            type="text"
            placeholder="Inserisci la email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <Spacer size={15} />
          <Typography variant="body">Password</Typography>
          <Spacer size={5} />
          <Input
            type="password"
            value={password}
            placeholder="Inserisci la password"
            name="psw"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <Spacer size={30} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={onConfirm}>
              <Typography variant="body2">Registrati</Typography>
            </Button>
          </div>
        </BoxWrapper>
      </BoxesWrapper>
    </PageWrapper>
  );
}
