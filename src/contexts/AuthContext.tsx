import { useContext, useState, useEffect, createContext, FC } from "react";
import { auth } from "utils/firebase";
import { createUserWithEmailAndPassword, User, UserCredential } from "firebase/auth";

export interface Authentication {
  currentUser: User | undefined;
  signup: (email: string, password: string) => Promise<UserCredential> | void;
}

export const AuthContext = createContext<Authentication>({ currentUser: undefined, signup: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();

  const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser, signup }}>{children}</AuthContext.Provider>;
};
