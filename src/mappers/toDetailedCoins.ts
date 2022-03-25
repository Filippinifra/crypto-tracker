import { DetailedCoinsDTO } from "types/api/detailedCoinsAPI";
import { DetailedCoins } from "types/detailedCoins";

export const toDetailedCoin = (detailedCoins: DetailedCoinsDTO): DetailedCoins =>
  detailedCoins.map(({ id, symbol, name, image, current_price, price_change_percentage_24h }) => ({
    id,
    symbol,
    name,
    image,
    currentPrice: current_price,
    priceChangePercentage24h: price_change_percentage_24h,
  }));
