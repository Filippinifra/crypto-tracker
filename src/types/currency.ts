export type CurrencySymbol = "€" | "$";
export type CurrencyName = "eur" | "usd";

export enum Currency {
  EUR,
  USD,
}

const currencySymbolMap = new Map<Currency, CurrencySymbol>([
  [Currency.EUR, "€"],
  [Currency.USD, "$"],
]);

const currencyNameMap = new Map<Currency, CurrencyName>([
  [Currency.EUR, "eur"],
  [Currency.USD, "usd"],
]);

export const getSymbolForCurrency = (currency: Currency): CurrencySymbol | undefined => currencySymbolMap.get(currency);
export const getNameForCurrency = (currency: Currency): CurrencyName | undefined => currencyNameMap.get(currency);
