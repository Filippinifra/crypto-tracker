import { useEffect, useState } from "react";

export const useDimensions = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    return () =>
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
  }, []);

  return {
    isSmallWidth: width < 600,
    isMediumWidth: width < 900,
    isLargeWidth: width >= 900,
    width,
    height,
  };
};
