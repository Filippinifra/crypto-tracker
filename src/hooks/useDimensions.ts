import { useEffect, useState } from "react";

export const useDimensions = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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
  }, [window]);

  return {
    isSmallWidth: width < 600,
    isMediumWidth: width < 900,
    isLargeWidth: width >= 900,
    width,
    height,
  };
};
