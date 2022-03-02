import { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { auth } from "utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const { setCurrentUser } = useAuth();

  const onConfirm = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pass);
      setCurrentUser(response.user);
    } catch (error) {
      console.log(["error on confirm signup", error]);
    }
  };

  return (
    <div>
      <Typography variant="body">Email</Typography>
      <Input
        type="text"
        placeholder="Enter Email"
        name="email"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <Typography variant="body">Password</Typography>
      <Input
        type="password"
        placeholder="Enter Password"
        name="psw"
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <Button onClick={onConfirm}>Conferma</Button>
    </div>
  );
}
