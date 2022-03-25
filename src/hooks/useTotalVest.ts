import { useEffect, useState } from "react";
import { TotalVest } from "types/totalVest";
import { useAuth } from "hooks/useAuth";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";
import { TotalVestDTO } from "types/api/totalVestAPI";
import { toTotalVest } from "mappers/toTotalVest";

export const useTotalVest = () => {
  const [totalVest, setTotalVest] = useState<TotalVestDTO>();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const { getVesting: getVestingDB, setVesting: setVestingDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newVesting: TotalVest) => {
    try {
      await setVestingDB(newVesting);
      setTotalVest(newVesting);
      showToast("Modifiche relative al totale investito salvate correttamente", "success");
    } catch {
      showToast("Modifiche relative al totale investito non salvate", "error");
    }
  };

  const getInitialVest = async () => {
    try {
      const response = await getVestingDB();
      const vest = response.val();
      setTotalVest(vest || 0);
    } catch {
      showToast("Errore nel caricare il totale investito", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getInitialVest();
    }
  }, [currentUser]);

  return {
    totalVest: totalVest ? toTotalVest(totalVest) : 0,
    setTotalVest: (newVesting: TotalVest) => {
      updateDatabase(newVesting);
    },
    loading,
  };
};
