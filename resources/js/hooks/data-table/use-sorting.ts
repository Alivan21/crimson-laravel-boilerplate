import { useCallback } from "react";

interface SortParams {
  order?: "asc" | "desc";
  col?: string;
}

const useSorting = (setParams: (params: (prevParams: SortParams) => SortParams) => void) => {
  const sort = useCallback(
    (column: string) => {
      setParams((prevParams) => ({
        ...prevParams,
        col: column,
        order: prevParams.order === "asc" ? "desc" : "asc",
      }));
    },
    [setParams],
  );

  return { sort };
};

export default useSorting;
