import { WalletDivisionDTO } from "types/api/walletDivisionAPI";
import { WalletDivision } from "types/walletDivision";
import { pieColorsDark } from "utils/colors";

export const toWallet = (wallet: WalletDivisionDTO): WalletDivision => {
  return wallet.map(({ percentage, typologyId, typologyName }, i: number) => {
    return { percentage, typologyId, typologyName, color: pieColorsDark[i] };
  });
};
