import { useCallback } from "react";

export const useCollapsibleStates = () => {
  const STORAGE_KEY = "sidebar-collapsible-states";

  const getSavedStates = useCallback((): Record<string, boolean> => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  }, []);

  const saveCollapsibleState = useCallback(
    (itemTitle: string, isOpen: boolean): void => {
      try {
        const savedStates = getSavedStates();
        const updatedStates = { ...savedStates, [itemTitle]: isOpen };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStates));
      } catch {
        // Silently fail if sessionStorage is not available
      }
    },
    [getSavedStates],
  );

  return { getSavedStates, saveCollapsibleState };
};
