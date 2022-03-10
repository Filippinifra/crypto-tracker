import React, { useState } from "react";
import { AuthProvider } from "contexts/AuthContext";
import { auth } from "utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"; //temporaneo
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  //const { signup } = useAuth();

  const onConfirm = async () => {
    //signup(mail, pass);
    //temporaneo
    //console.log(e);
    const response = await createUserWithEmailAndPassword(auth, email, pass);

    console.log(response);
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   console.log(user);
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    //   // ..
    // });
  };

  return (
    <AuthProvider>
      <div>
        <Typography variant="body">Email</Typography>
        <Input
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          value=""
        />
        <Typography variant="body">Password</Typography>
        <Input
          type="password"
          placeholder="Enter Password"
          name="psw"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          value=""
        />
        <Button onClick={onConfirm}>Conferma</Button>
      </div>
    </AuthProvider>
  );
}
