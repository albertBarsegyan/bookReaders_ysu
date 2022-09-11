import { useEffect } from "react";

const useClickOutside = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback, ref]);
};

export default useClickOutside;
