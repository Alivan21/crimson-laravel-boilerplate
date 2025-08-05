import { Input } from "@/components/ui/input";
import { TDataTableParams } from "@/types/shared/response";
import { Search } from "lucide-react";
import { DataTableFilter, type TFilterableColumn } from "./filter";

type DataTableToolbarProps = {
  searchPlaceholder: string;
  searchKey: string;
  params: TDataTableParams;
  setParams: (params: (prevParams: TDataTableParams) => TDataTableParams) => void;
  filterComponents?: TFilterableColumn[];
};

export function DataTableToolbar({
  searchPlaceholder,
  searchKey,
  params,
  setParams,
  filterComponents,
}: DataTableToolbarProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
        <Input
          className="h-9 w-full pl-8"
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              [searchKey]: e.target.value,
            }))
          }
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
