import { useEffect } from "react";
import { useCurrentLocation } from "../hooks";

export const ScrollToTop = () => {
  const pathname = useCurrentLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
