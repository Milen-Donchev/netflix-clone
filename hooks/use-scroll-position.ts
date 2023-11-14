import { useEffect, useState } from "react";

export const useScrollPosition = (yThreshold: number = 100) => {
  const [yPosition, setYPosition] = useState(0);

  const handleScroll = () => {
    setYPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isAboveThreshold: yPosition > yThreshold,
  };
};
