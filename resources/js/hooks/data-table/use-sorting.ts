import { useCallback } from "react";

interface SortParams {
  order?: "asc" | "desc";
  sort_by?: string;
}

const useSorting = (setParams: (params: (prevParams: SortParams) => SortParams) => void) => {
  const sort = useCallback(
    (column: string) => {
      setParams((prevParams) => ({
        ...prevParams,
        sort_by: column,
        order: prevParams.order === "asc" ? "desc" : "asc",
      }));
    },
    [setParams],
  );

  return { sort };
};

export default useSorting;
