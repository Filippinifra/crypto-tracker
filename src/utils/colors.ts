export const pieColors = ["#F1948A", "#BB8FCE", "#85C1E9", "#73C6B6", "#82E0AA", "#F8C471", "#E59866", "#D98880", "#C39BD3", "#7FB3D5", "#76D7C4", "#7DCEA0", "#F7DC6F", "#F0B27A"];
export const pieColorsDark = ["#E74C3C", "#8E44AD", "#3498DB", "#16A085", "#2ECC71", "#F39C12", "#D35400", "#C0392B", "#9B59B6", "#2980B9", "#1ABC9C", "#27AE60", "#F1C40F", "#E67E22"];

export const headerGridCoinColors = ["#FEA99A", "#F7D5A1", "#F8ED8B", "#C6EF81", "#B4EAF8", "#E2B6D2"];
export const headerGridWalletColor = "#F3D6FF";

export const vestColor = "#FFD700";

export const loadingColor = "#f3ea5f";
export const errorColor = "#ff3f3f";
export const successColor = "#8fce00";

export const percentageBalanceColors = ["#ff0000", "#ff4c4c", "#ff9999", "#f3fae5", "#d2eb99", "#b0dc4c", "#8fce00"];
export const fiatRebalanceColors = ["#ff0000", "#ff4c4c", "#f3fae5", "#b0dc4c", "#8fce00"];
export const vestSummaryColors = ["#ff4c4c", "#ff9999", "#f3fae5", "#b0dc4c"];

export const greenVariationColor = "#006400";
export const redVariationColor = "#8B0000";

export const tooltipColor = "#f3ea5f";
export const warningColor = "#f3ea5f";

export const important24hChangeColors = ["#f2efc2", "#f3ea5f"];

export const removeColor = "#ff3f3f";
export const addColor = "#8fce00";

export const getPercentageBalanceColor = (value: number) => {
  if (value < 40) {
    return percentageBalanceColors[0];
  } else if (value < 60) {
    return percentageBalanceColors[1];
  } else if (value < 80) {
    return percentageBalanceColors[2];
  } else if (value < 120) {
    return percentageBalanceColors[3];
  } else if (value < 140) {
    return percentageBalanceColors[4];
  } else if (value < 160) {
    return percentageBalanceColors[5];
  } else {
    return percentageBalanceColors[6];
  }
};

export const getFiatRebalanceColor = (value: number) => {
  if (value < -200) {
    return fiatRebalanceColors[0];
  } else if (value < -50) {
    return fiatRebalanceColors[1];
  } else if (value < 50) {
    return fiatRebalanceColors[2];
  } else if (value < 200) {
    return fiatRebalanceColors[3];
  } else {
    return fiatRebalanceColors[4];
  }
};

export const getVestSummaryColor = (value: number) => {
  if (value < -1000) {
    return vestSummaryColors[0];
  } else if (value < 0) {
    return vestSummaryColors[1];
  } else if (value < 1000) {
    return vestSummaryColors[2];
  } else {
    return vestSummaryColors[3];
  }
};

export const getPriceChangeColor = (priceChange24: number, defaultColor: string) => {
  if (priceChange24 < -10) {
    return important24hChangeColors[1];
  } else if (priceChange24 < -5) {
    return important24hChangeColors[0];
  } else if (priceChange24 < 5) {
    return defaultColor;
  } else if (priceChange24 < 10) {
    return important24hChangeColors[0];
  } else {
    return important24hChangeColors[1];
  }
};
