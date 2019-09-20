import { useEffect } from "react";

export const useEscape = (onEscape: () => void) => {
  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [onEscape]);
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClickOutside();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export const useFocusTrap = () => {
  // TODO
};
