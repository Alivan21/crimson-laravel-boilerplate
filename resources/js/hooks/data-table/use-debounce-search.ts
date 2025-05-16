import { ITableParams } from "@/types/shared";
import { router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import usePrevious from "./use-previous";
const DEFAULT_LIMIT = 10;

const useDebouncedSearch = (
  url: string,
  initialParams: Partial<ITableParams>,
  initialTimeDebounce = 1000,
) => {
  const [params, setParams] = useState<ITableParams>({
    limit: DEFAULT_LIMIT,
    ...initialParams,
  });
  const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
  const prevParams = usePrevious(params);

  const search = useCallback(
    debounce((params) => {
      router.get(url, pickBy(params), {
        replace: true,
        preserveScroll: true,
        preserveState: true,
        queryStringArrayFormat: "indices",
      });
    }, timeDebounce),
    [timeDebounce],
  );

  useEffect(() => {
    if (prevParams) {
      search(params);
    }
  }, [params]);

  return { params, setParams, setTimeDebounce };
};

export default useDebouncedSearch;
