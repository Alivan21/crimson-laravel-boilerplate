import { useCallback } from "react";

interface SortParams {
  sort?: "asc" | "desc";
  col?: string;
}

const useSorting = (setParams: (params: (prevParams: SortParams) => SortParams) => void) => {
  const sort = useCallback(
    (column: string) => {
      setParams((prevParams) => ({
        ...prevParams,
        col: column,
        sort: prevParams.sort === "asc" ? "desc" : "asc",
      }));
    },
    [setParams],
  );

  return { sort };
};

export default useSorting;
