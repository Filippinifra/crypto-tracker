import { PersonalCoinsDTO } from "types/api/personalCoinsAPI";
import { PersonalCoins } from "types/personalCoins";

export const toPersonalCoins = (personalCoins: PersonalCoinsDTO): PersonalCoins => {
  return personalCoins.map(({ coins, id, keyElement, percentage, platform, typologyId }) => ({ coins, id, keyElement, percentage, platform, typologyId }));
};
