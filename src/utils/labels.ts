export const PLACEHOLDER = "-";

export const getSplittedPrice = (price: number, lengthParam?: number, maxDecimals?: number, showPositiveSign?: boolean) => {
  const length = lengthParam || 6;
  const isNegative = price < 0;

  const getResultWithSign = (result: string) => (isNegative ? `-${result}` : showPositiveSign ? `+${result}` : result);

  const stringedPrice = isNegative ? String(price).substring(1) : String(price);
  const haveDecimals = stringedPrice.includes(".");

  if (!haveDecimals) {
    return getResultWithSign(stringedPrice);
  }

  const [digitsBeforeDecimal, digitsAfterDecimal] = stringedPrice.split(".");

  if (maxDecimals === 0) {
    return getResultWithSign(digitsBeforeDecimal);
  }

  const lenghtDigitsBeforeDecimal = digitsBeforeDecimal.length;

  if (lenghtDigitsBeforeDecimal >= length) {
    return getResultWithSign(digitsBeforeDecimal);
  }

  return getResultWithSign(`${digitsBeforeDecimal}.${digitsAfterDecimal.substring(0, maxDecimals === undefined ? length - lenghtDigitsBeforeDecimal : maxDecimals)}`);
};
