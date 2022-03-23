import { WalletDivisionDTO } from "types/walletDivision";
import { database } from "utils/firebase";
import { child, get, ref, set } from "firebase/database";
import { Paths } from "types/paths";
import { PersonalCoins } from "types/personalCoins";
import { User } from "firebase/auth";
import { TotalVest } from "types/totalVest";

export const useDatabase = (currentUser: User | undefined) => {
  const mainPath = "Users/" + currentUser?.uid + "/";

  const getCoins = () => getDatabase("coins");

  const getWallet = () => getDatabase("wallet");

  const getVesting = () => getDatabase("vesting");

  const setCoins = (data: PersonalCoins) => setDatabase(data, "coins");

  const setWallet = (data: WalletDivisionDTO) => setDatabase(data, "wallet");

  const setVesting = (data: TotalVest) => setDatabase(data, "vesting");

  const setDatabase = (data: any, path: Paths) => set(ref(database, mainPath + path), data);

  const getDatabase = async (path: Paths) => get(child(ref(database), mainPath + path));

  return { getCoins, getWallet, getVesting, setCoins, setWallet, setVesting };
};
