import { database } from "utils/firebase";
import { child, get, ref, set } from "firebase/database";
import { Paths } from "types/paths";
import { PersonalCoins } from "types/personalCoins";
import { User } from "firebase/auth";

export const useDatabase = (currentUser: User | undefined) => {
  const mainPath = "Users/" + currentUser?.uid + "/";

  const setCoins = (data: PersonalCoins) => {
    setDatabase(data, "coin");
  };

  const setDatabase = (data: any, path: Paths) => {
    if (currentUser) {
      try {
        set(ref(database, mainPath + path), data);
      } catch (error) {
        console.log(["on set db error", error]);
      }
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
        console.log(["on get db error", error]);
      }
    }
    return null;
  };

  return { setCoins, getDatabase };
};
