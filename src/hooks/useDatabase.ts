import { useAuth } from "contexts/AuthContext";
import { database } from "utils/firebase";
import { child, get, ref, set, onValue } from "firebase/database";
import { Paths } from "types/paths";
import { UserData } from "types/userData";
import { PersonalCoins } from "types/personalCoins";
import { User } from "firebase/auth";

export const useDatabase = (currentUser: User | undefined) => {
  console.log(["useDatabase - currentUser", currentUser]);
  const mainPath = "Users/" + currentUser?.uid + "/";

  const setCoins = (data: PersonalCoins) => {
    console.log(["in setCoins", currentUser?.email]);
    setDatabase(data, "coin");
  };

  // aggiungere try catch?
  const setDatabase = (data: any, path: Paths) => {
    if (currentUser) {
      try {
        set(ref(database, mainPath + path), data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("utente non settato");
    }
  };

  const getDatabase = async (path: Paths) => {
    if (currentUser) {
      try {
        const response = await get(child(ref(database), mainPath + path));
        if (response.exists()) {
          return response.val();
        } else {
          return {};
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  };

  return { setCoins, getDatabase };
};

/* onValue(ref(path), (snapshot) => {
  return snapshot.val();
}); */
