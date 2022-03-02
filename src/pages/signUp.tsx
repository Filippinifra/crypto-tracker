import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { auth } from "utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"; //temporaneo
import { database } from "utils/firebase";
import { ref, set } from "firebase/database";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { useDatabase } from "hooks/useDatabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const { setCurrentUser, currentUser } = useAuth();

  const onConfirm = async () => {
    //signup(mail, pass);
    //temporaneo
    //console.log(e);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pass);
      setCurrentUser(response.user);
    } catch (error) {
      console.log(error); //da fare file log
    }
  };

  console.log(["currentuser", currentUser]);

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
