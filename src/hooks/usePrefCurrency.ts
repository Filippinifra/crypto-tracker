import { useTranslation } from "react-i18next";
import { Currency } from "types/currency";
import { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useDatabase } from "hooks/useDatabase";
import { useToast } from "hooks/useToast";
import { toPrefCurrency } from "mappers/toPrefCurrency";

export const usePrefCurrency = () => {
  const [prefCurrency, setPrefCurrency] = useState<Currency>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const { currentUser } = useAuth();
  const { getCurrency: getCurrencyDB, setCurrency: setCurrencyDB } = useDatabase(currentUser || undefined);

  const { showToast } = useToast();

  const updateDatabase = async (newCurrency: Currency) => {
    try {
      await setCurrencyDB(newCurrency);
      setPrefCurrency(newCurrency);
      showToast(`${t("home.prefCurrencyUpdateCompleted")} ${Currency[newCurrency]}`, "success");
      showToast(`${t("home.prefCurrencyShouldChangeVesting")} ${Currency[newCurrency]}`, "warning");
    } catch {
      showToast(t("home.prefCurrencyUpdateError"), "error");
    }
  };

  const getInitialCurrency = async () => {
    try {
      const response = await getCurrencyDB();
      const currency = response.val();
      setPrefCurrency(currency || Currency.EUR);
    } catch {
      showToast(t("home.prefCurrencyFetchError"), "error");
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
