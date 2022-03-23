import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";
import { useAuth } from "hooks/useAuth";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";

export const usePersonalCoins = () => {
  const [personalCoins, setPersonalCoins] = useState<PersonalCoins>();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const { getCoins: getCoinsDB, setCoins: setCoinsDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newCoins: PersonalCoins) => {
    try {
      await setCoinsDB(newCoins);
      setPersonalCoins(newCoins);
      showToast("Modifiche relative alle monete salvate correttamente", "success");
    } catch {
      showToast("Modifiche relative alle monete non salvate", "error");
    }
  };

  const getInitialCoins = async () => {
    try {
      const response = await getCoinsDB();
      const coins = response.val();
      setPersonalCoins(coins || []);
    } catch (e) {
      showToast("Errore nel caricare le monete", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getInitialCoins();
    }
  }, [currentUser]);

  return {
    personalCoins,
    setPersonalCoins: (newCoins: PersonalCoins) => {
      updateDatabase(newCoins);
    },
    loading,
  };
};
