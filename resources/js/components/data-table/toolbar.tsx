import { Input } from "@/components/ui/input";
import { ITableParams } from "@/types/shared";

interface DataTableToolbarProps {
  searchPlaceholder: string;
  searchKey: string;
  params: ITableParams;
  setParams: (params: (prevParams: ITableParams) => ITableParams) => void;
}

export function DataTableToolbar({
  searchPlaceholder,
  searchKey,
  params,
  setParams,
}: DataTableToolbarProps) {
  return (
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
  );
}
