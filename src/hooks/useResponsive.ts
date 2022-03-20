import { useCallback } from "react";
import { useDimensions } from "./useDimensions";

export const useResponsive = () => {
  const { isSmallWidth, isMediumWidth } = useDimensions();

  const calculateValue = useCallback(
    ([smallValue, mediumValue, largeValue]: any[]) => {
      if (isSmallWidth) {
        return smallValue;
      } else if (isMediumWidth) {
        return mediumValue;
      } else {
        return largeValue;
      }
    },
    [isSmallWidth, isMediumWidth]
  );

  return { getResponsiveValue: calculateValue };
};
