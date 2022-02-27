import React, { useRef, useState } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { auth } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; //temporaneo

const authPages = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const emailRef = useRef();
  const passRef = useRef();
  //const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    //signup(mail, pass);
    //temporaneo
    //console.log(e);
    console.log(emailRef.current.value);
    console.log(passRef.current.value);
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  }

  return (
    <AuthProvider>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            ref={emailRef}
            //onChange={(val) => setMail(val)}
            required
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            ref={passRef}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </AuthProvider>
  );
};

export default authPages;
