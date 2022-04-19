import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { PersonalCoins } from "types/personalCoins";
import { useAuth } from "hooks/useAuth";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";
import { toPersonalCoins } from "mappers/toPersonalCoins";

export const usePersonalCoins = () => {
  const [personalCoins, setPersonalCoins] = useState<PersonalCoins>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const { currentUser } = useAuth();
  const { getCoins: getCoinsDB, setCoins: setCoinsDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newCoins: PersonalCoins) => {
    try {
      await setCoinsDB(newCoins);
      setPersonalCoins(newCoins);
      showToast(t("home.coins.updateCompleted"), "success");
    } catch {
      showToast(t("home.coins.updateError"), "error");
    }
  };

  const getInitialCoins = async () => {
    try {
      const response = await getCoinsDB();
      const coins = response.val();
      setPersonalCoins(coins || []);
    } catch (e) {
      showToast(t("home.coins.fetchError"), "error");
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
    personalCoins: personalCoins ? toPersonalCoins(personalCoins) : undefined,
    setPersonalCoins: (newCoins: PersonalCoins) => {
      updateDatabase(newCoins);
    },
    loading,
  };
};
