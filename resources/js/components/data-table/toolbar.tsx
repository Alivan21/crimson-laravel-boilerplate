import { Input } from "@/components/ui/input";
import { ITableParams } from "@/types/shared";
import { Search } from "lucide-react";
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
    <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
      {filterComponents && filterComponents.length > 0 && (
        <DataTableFilter columns={filterComponents} params={params} setParams={setParams} />
      )}
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
          value={params[searchKey] || ""}
        />
      </div>
    </div>
  );
}
