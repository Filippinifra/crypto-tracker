import { useTranslation } from "react-i18next";
import { useAuth } from "hooks/useAuth";
import { WalletDivision } from "types/walletDivision";
import { useEffect, useState } from "react";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";
import { WalletDivisionDTO } from "types/api/walletDivisionAPI";
import { toWallet } from "mappers/toWallet";

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletDivisionDTO>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const { currentUser } = useAuth();
  const { getWallet: getWalletDB, setWallet: setWalletDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newWallet: WalletDivision) => {
    try {
      const finalWallet: WalletDivisionDTO = newWallet.map(({ percentage, typologyId, typologyName }) => ({ percentage, typologyId, typologyName }));
      await setWalletDB(finalWallet);
      setWallet(newWallet);
      showToast(t("home.wallet.updateCompleted"), "success");
    } catch {
      showToast(t("home.wallet.updateError"), "error");
    }
  };

  const getInitialWallet = async () => {
    try {
      const response = await getWalletDB();
      const wallet: WalletDivisionDTO = response.val();
      setWallet(wallet || []);
    } catch {
      showToast(t("home.wallet.fetchError"), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getInitialWallet();
    }
  }, [currentUser]);

  return {
    wallet: wallet ? toWallet(wallet) : undefined,
    setWallet: (newWallet: WalletDivision) => {
      updateDatabase(newWallet);
    },
    loading,
  };
};
