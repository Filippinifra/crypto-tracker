import { useCallback } from "react";
import { useDimensions } from "hooks/useDimensions";

export const useResponsive = () => {
  const { isSmallWidth, isMediumWidth, width } = useDimensions();

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

  const getCustomResponsiveValue = useCallback(
    (descendantsStairsValue: [viewPort: number, value: any][]) => {
      const stair = descendantsStairsValue.find(([viewPort]) => viewPort < width);
      return stair ? stair?.[1] : descendantsStairsValue[descendantsStairsValue.length - 1][1];
    },
    [width]
  );

  return { getResponsiveValue: calculateValue, getCustomResponsiveValue };
};
