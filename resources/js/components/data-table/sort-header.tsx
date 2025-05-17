import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Column } from "./index";

interface DataTableSortHeaderProps<TData> {
  column: Column<TData>;
  sort: (column: string) => void;
  currentSort?: "asc" | "desc";
  currentColumn?: string;
}

export function DataTableSortHeader<TData>({
  column,
  sort,
  currentSort,
  currentColumn,
}: DataTableSortHeaderProps<TData>) {
  if (!column.enableSorting) {
    return <span>{column.header}</span>;
  }

  return (
    <Button
      className="data-[state=open]:bg-accent h-8"
      onClick={() => sort(column.id)}
      variant="ghost"
    >
      <span>{column.header}</span>
      {currentColumn === column.id && (
        <span className="ml-2">
          {currentSort === "asc" ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
        </span>
      )}
    </Button>
  );
}
