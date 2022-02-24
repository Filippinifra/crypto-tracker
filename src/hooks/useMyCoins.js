import { useState } from "react";

export const useMyCoins = () => {
  const [coins, setCoins] = useState([]);

  return { coins, setCoins };
};
