import { Search } from "lucide-react";
import { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { TDataTableParams } from "@/types/shared/response";
import { DataTableFilter, type TFilterableColumn } from "./filter";

type DataTableToolbarProps = {
  filterComponents?: TFilterableColumn[];
  params: TDataTableParams;
  searchKey: string;
  searchPlaceholder: string;
  setParams: (params: (prevParams: TDataTableParams) => TDataTableParams) => void;
};

export function DataTableToolbar({
  filterComponents,
  params,
  searchKey,
  searchPlaceholder,
  setParams,
}: DataTableToolbarProps) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setParams((prev) => ({
        ...prev,
        [searchKey]: e.target.value,
      }));
    },
    [searchKey, setParams],
  );

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
        <Input
          className="h-9 w-full pl-8"
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          value={params[searchKey]?.toString() || ""}
        />
      </div>

      {filterComponents && filterComponents.length > 0 && (
        <DataTableFilter
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          columns={filterComponents}
          params={params}
          setParams={setParams}
        />
      )}
    </div>
  );
}
