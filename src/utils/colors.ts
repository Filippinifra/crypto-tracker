export const pieColors = ["#F1948A", "#BB8FCE", "#85C1E9", "#73C6B6", "#82E0AA", "#F8C471", "#E59866", "#D98880", "#C39BD3", "#7FB3D5", "#76D7C4", "#7DCEA0", "#F7DC6F", "#F0B27A"];
export const pieColorsDark = ["#E74C3C", "#8E44AD", "#3498DB", "#16A085", "#2ECC71", "#F39C12", "#D35400", "#C0392B", "#9B59B6", "#2980B9", "#1ABC9C", "#27AE60", "#F1C40F", "#E67E22"];

export const gridCoinColors = ["#FEA99A", "#F7D5A1", "#F8ED8B", "#C6EF81", "#B4EAF8", "#E2B6D2"];
export const gridWalletColor = "#F3D6FF";

export const vestColor = "#FFD700";

export const loadingColor = "#f3ea5f";
export const errorColor = "#ff3f3f";

export const percentageBalanceColor = ["#ff0000", "#ff4c4c", "#ff9999", "#f3fae5", "#d2eb99", "#b0dc4c", "#8fce00"];
export const fiatRebalanceColor = ["#ff0000", "#ff4c4c", "#f3fae5", "#b0dc4c", "#8fce00"];

export const getPercentageBalanceColor = (value: number) => {
  if (value < 40) {
    return percentageBalanceColor[0];
  } else if (value >= 40 && value <= 59) {
    return percentageBalanceColor[1];
  } else if (value >= 60 && value <= 79) {
    return percentageBalanceColor[2];
  } else if (value >= 80 && value <= 120) {
    return percentageBalanceColor[3];
  } else if (value >= 121 && value <= 140) {
    return percentageBalanceColor[4];
  } else if (value >= 141 && value <= 160) {
    return percentageBalanceColor[5];
  } else {
    return percentageBalanceColor[6];
  }
};

export const getFiatRebalanceColor = (value: number) => {
  if (value < -200) {
    return fiatRebalanceColor[0];
  } else if (value >= -200 && value <= -50) {
    return fiatRebalanceColor[1];
  } else if (value >= -50 && value <= 50) {
    return fiatRebalanceColor[2];
  } else if (value >= 50 && value <= 200) {
    return fiatRebalanceColor[3];
  } else {
    return fiatRebalanceColor[4];
  }
};
