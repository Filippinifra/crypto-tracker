import { toUser } from "mappers/toUser";
import { useState, useEffect, createContext, FC, Dispatch, SetStateAction } from "react";
import { User } from "types/user";
import { auth, analytics } from "utils/firebase";
import { setUserId as setAnalyticsUserId } from "firebase/analytics";

export interface Authentication {
  currentUser: User | undefined | null;
  setCurrentUser: Dispatch<SetStateAction<User | undefined | null>>;
  isLoadingUser: boolean;
}

export const AuthContext = createContext<Authentication>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
  isLoadingUser: false,
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (analytics) {
          setAnalyticsUserId(analytics, user.uid);
        }
        setCurrentUser(toUser(user));
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoadingUser: currentUser === undefined }}>{children}</AuthContext.Provider>;
};
