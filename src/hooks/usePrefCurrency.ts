import { Currency } from "types/currency";
import { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";
import { toPrefCurrency } from "mappers/toPrefCurrency";

export const usePrefCurrency = () => {
  const [prefCurrency, setPrefCurrency] = useState<Currency>();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const { getCurrency: getCurrencyDB, setCurrency: setCurrencyDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newCurrency: Currency) => {
    try {
      await setCurrencyDB(newCurrency);
      setPrefCurrency(newCurrency);
      showToast(`La valuta è stata cambiata in ${Currency[newCurrency]}`, "success");
      showToast(`Attenzione! È necessario cambiare manualmente il totale investito in ${Currency[newCurrency]}`, "warning");
    } catch {
      showToast("Modifiche relative al cambio della valuta non salvate", "error");
    }
  };

  const getInitialCurrency = async () => {
    try {
      const response = await getCurrencyDB();
      const currency = response.val();
      setPrefCurrency(currency || Currency.EUR);
    } catch {
      showToast("Errore nel caricare la valuta", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getInitialCurrency();
    }
  }, [currentUser]);

  return {
    prefCurrency: prefCurrency ? toPrefCurrency(prefCurrency) : Currency.EUR,
    setPrefCurrency: (newCurrency: Currency) => {
      updateDatabase(newCurrency);
    },
    loading,
  };
};
