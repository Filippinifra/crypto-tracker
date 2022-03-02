import { useContext, useState, useEffect, createContext, FC, Dispatch, SetStateAction } from "react";
import { auth } from "utils/firebase";
import { User } from "firebase/auth";
import { UserData } from "types/userData";
import { useDatabase } from "hooks/useDatabase";

export interface Authentication {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export const AuthContext = createContext<Authentication>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
  userData: { coins: [] },
  setUserData: () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [userData, setUserData] = useState<UserData>({ coins: [] });
  const { getDatabase } = useDatabase(currentUser);

  const setInitialInfo = async () => {
    try {
      const coins = await getDatabase("coin");

      setUserData({ coins });
    } catch (e) {
      console.log(["on set initial info in context", e]);
    }
  };

  useEffect(() => {
    setInitialInfo();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, userData, setUserData }}>{children}</AuthContext.Provider>;
};
