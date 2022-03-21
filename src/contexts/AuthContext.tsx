import { useState, useEffect, createContext, FC, Dispatch, SetStateAction } from "react";
import { auth } from "utils/firebase";
import { User } from "firebase/auth";
import { UserData } from "types/userData";
import { useDatabase } from "hooks/useDatabase";

export interface Authentication {
  currentUser: User | undefined | null;
  setCurrentUser: Dispatch<SetStateAction<User | undefined | null>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  isLoadingUser: boolean;
}

export const AuthContext = createContext<Authentication>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
  userData: { coins: [] },
  setUserData: () => undefined,
  isLoadingUser: false,
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(undefined);
  const [userData, setUserData] = useState<UserData>({ coins: [] });
  const { getDatabase } = useDatabase(currentUser || undefined);

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
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, userData, setUserData, isLoadingUser: currentUser === undefined }}>{children}</AuthContext.Provider>;
};
