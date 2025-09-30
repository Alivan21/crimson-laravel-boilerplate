import { TDataTableParams } from "@/types/shared/response";
import { router } from "@inertiajs/react";
import { debounce, pickBy } from "es-toolkit";
import { useEffect, useMemo, useState } from "react";
import usePrevious from "./use-previous";

const useDebouncedSearchParams = (
  url: string,
  initialParams: Partial<TDataTableParams>,
  initialTimeDebounce = 500,
) => {
  const [params, setParams] = useState<TDataTableParams>({
    ...initialParams,
  });
  const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
  const prevParams = usePrevious(params);

  // Memoize the debounced search function with all dependencies
  const search = useMemo(
    () =>
      debounce((params: TDataTableParams) => {
        router.get(
          url,
          pickBy(params, (value) => value !== undefined && value !== ""),
          {
            preserveScroll: true,
            preserveState: true,
            queryStringArrayFormat: "indices",
            replace: true,
          },
        );
      }, timeDebounce),
    [timeDebounce, url],
  );

  useEffect(() => {
    if (prevParams) {
      search(params);
    }
  }, [params, prevParams, search]);

  return { params, setParams, setTimeDebounce };
};

export default useDebouncedSearchParams;
