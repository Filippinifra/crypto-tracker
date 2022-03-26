import { database } from "utils/firebase";
import { child, get, ref, set } from "firebase/database";
import { DatabasePaths } from "types/databasePaths";
import { WalletDivisionDTO } from "types/api/walletDivisionAPI";
import { TotalVestDTO } from "types/api/totalVestAPI";
import { PersonalCoinsDTO } from "types/api/personalCoinsAPI";
import { User } from "types/user";

export const useDatabase = (currentUser: User | undefined) => {
  const mainPath = "Users/" + currentUser?.uid + "/";

  const getCoins = () => getDatabase("coins");

  const getWallet = () => getDatabase("wallet");

  const getVesting = () => getDatabase("vesting");

  const setCoins = (data: PersonalCoinsDTO) => setDatabase(data, "coins");

  const setWallet = (data: WalletDivisionDTO) => setDatabase(data, "wallet");

  const setVesting = (data: TotalVestDTO) => setDatabase(data, "vesting");

  const setDatabase = (data: any, path: DatabasePaths) => set(ref(database, mainPath + path), data);

  const getDatabase = async (path: DatabasePaths) => get(child(ref(database), mainPath + path));

  return { getCoins, getWallet, getVesting, setCoins, setWallet, setVesting };
};
