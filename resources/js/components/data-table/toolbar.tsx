import { Input } from "@/components/ui/input";
import { ITableParams } from "@/types/shared";
import { DataTableFilter, type FilterableColumn } from "./filter";

interface DataTableToolbarProps {
  searchPlaceholder: string;
  searchKey: string;
  params: ITableParams;
  setParams: (params: (prevParams: ITableParams) => ITableParams) => void;
  filterComponents?: FilterableColumn[];
}

export function DataTableToolbar({
  searchPlaceholder,
  searchKey,
  params,
  setParams,
  filterComponents,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                [searchKey]: e.target.value,
              }))
            }
            placeholder={searchPlaceholder}
            value={params[searchKey] || ""}
          />
        </div>
      </div>
      {filterComponents && filterComponents.length > 0 && (
        <DataTableFilter columns={filterComponents} params={params} setParams={setParams} />
      )}
    </div>
  );
}
