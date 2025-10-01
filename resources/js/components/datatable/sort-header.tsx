import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { memo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { TColumn } from "./index";

type DataTableSortHeaderProps<TData> = {
  column: TColumn<TData>;
  currentColumn?: string;
  currentSort?: "asc" | "desc";
  sort: (column: string, direction: "asc" | "desc" | undefined) => void;
};

function DataTableSortHeaderComponent<TData>({
  column,
  currentColumn,
  currentSort,
  sort,
}: DataTableSortHeaderProps<TData>) {
  const handleSort = useCallback(() => {
    if (currentColumn !== column.id) {
      sort(column.id, "asc");
    } else if (currentSort === "asc") {
      sort(column.id, "desc");
    } else if (currentSort === "desc") {
      sort("", undefined);
    }
  }, [column.id, currentColumn, currentSort, sort]);

  if (!column.enableSorting) {
    return <span>{column.header}</span>;
  }

  const isActive = currentColumn === column.id;
  const SortIcon =
    isActive && currentSort === "asc"
      ? ChevronDown
      : isActive && currentSort === "desc"
        ? ChevronUp
        : ChevronsUpDown;

  return (
    <Button
      className="group text-card-foreground hover:bg-accent hover:text-accent-foreground flex h-auto min-h-8 w-full items-center justify-start bg-transparent px-2 py-1 font-bold"
      onClick={handleSort}
      variant="ghost"
    >
      <span className="text-left text-wrap break-words">{column.header}</span>
      <span className="ml-auto transition-opacity">
        <SortIcon className="text-muted-foreground size-4" />
      </span>
    </Button>
  );
}

// Memoize the component to prevent unnecessary rerenders
export const DataTableSortHeader = memo(
  DataTableSortHeaderComponent,
) as typeof DataTableSortHeaderComponent;
