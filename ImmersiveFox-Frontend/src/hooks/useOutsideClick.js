import { useEffect } from "react";

export const useOutsideClick = (ref, callback) => {
  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(ref.current)) {
      callback();
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
    // eslint-disable-next-line
  }, []);
};
