import { ITableParams } from "@/types/shared";
import { router } from "@inertiajs/react";
import { debounce, pickBy } from "es-toolkit";
import { useCallback, useEffect, useState } from "react";
import usePrevious from "./use-previous";

const useDebouncedSearch = (
  url: string,
  initialParams: Partial<ITableParams>,
  initialTimeDebounce = 500,
) => {
  const [params, setParams] = useState<ITableParams>({
    ...initialParams,
  });
  const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
  const prevParams = usePrevious(params);

  const search = useCallback(
    debounce((params) => {
      router.get(
        url,
        pickBy(params, (value) => Boolean(value)),
        {
          replace: true,
          preserveScroll: true,
          preserveState: true,
          queryStringArrayFormat: "indices",
        },
      );
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
