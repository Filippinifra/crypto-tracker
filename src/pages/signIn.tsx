import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; //temporaneo
import { ref, onValue } from "firebase/database";
import { database } from "utils/firebase";
import { useAuth } from "contexts/AuthContext";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { useDatabase } from "hooks/useDatabase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const { currentUser, setCurrentUser, setUserData, userData } = useAuth();
  const { getDatabase } = useDatabase();

  const onConfirm = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, pass);
      await setCurrentUser(response.user);
      const databaseResponse = await getDatabase("coin");
      await setUserData(databaseResponse);
    } catch (error) {
      console.log(error); //da fare file log
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
      <p>{JSON.stringify(userData)}</p>
    </div>
  );
}
