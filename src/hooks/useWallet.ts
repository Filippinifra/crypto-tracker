import { useAuth } from "hooks/useAuth";
import { pieColorsDark } from "utils/colors";
import { WalletDivision, WalletDivisionDTO } from "types/walletDivision";
import { useEffect, useState } from "react";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletDivisionDTO>();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const { getWallet: getWalletDB, setWallet: setWalletDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newWallet: WalletDivision) => {
    try {
      const finalWallet: WalletDivisionDTO = newWallet.map(({ percentage, typologyId, typologyName }) => ({ percentage, typologyId, typologyName }));
      await setWalletDB(finalWallet);
      setWallet(finalWallet);
      showToast("Modifiche relative all'allocazione del portafoglio salvate correttamente", "success");
    } catch {
      showToast("Modifiche relative all'allocazione del portafoglio non salvate", "error");
    }
  };

  const getInitialWallet = async () => {
    try {
      const response = await getWalletDB();
      const wallet = response.val();
      setWallet(wallet || []);
    } catch {
      showToast("Errore nel caricare il portafoglio", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getInitialWallet();
    }
  }, [currentUser]);

  const walletWithColors = wallet?.map((e, i) => {
    return { ...e, color: pieColorsDark[i] };
  });

  return {
    wallet: walletWithColors,
    setWallet: (newWallet: WalletDivision) => {
      updateDatabase(newWallet);
    },
    loading,
  };
};
