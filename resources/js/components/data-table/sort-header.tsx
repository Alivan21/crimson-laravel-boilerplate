import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { TColumn } from "./index";

type DataTableSortHeaderProps<TData> = {
  column: TColumn<TData>;
  sort: (column: string, direction: "asc" | "desc" | undefined) => void;
  currentSort?: "asc" | "desc";
  currentColumn?: string;
};

export function DataTableSortHeader<TData>({
  column,
  sort,
  currentSort,
  currentColumn,
}: DataTableSortHeaderProps<TData>) {
  if (!column.enableSorting) {
    return <span>{column.header}</span>;
  }

  const handleSort = () => {
    if (currentColumn !== column.id) {
      sort(column.id, "asc");
    } else if (currentSort === "asc") {
      sort(column.id, "desc");
    } else if (currentSort === "desc") {
      sort("", undefined);
    }
  };

  return (
    <Button
      className="group flex h-auto min-h-8 w-full items-center justify-start bg-transparent px-2 py-1 font-bold text-black"
      onClick={handleSort}
      variant="ghost"
    >
      <span className="text-left text-wrap break-words">{column.header}</span>
      {column.enableSorting && (
        <span className="ml-auto transition-opacity">
          {currentColumn === column.id ? (
            currentSort === "asc" ? (
              <ChevronDown className="size-4 text-gray-800" />
            ) : currentSort === "desc" ? (
              <ChevronUp className="size-4 text-gray-800" />
            ) : (
              <ChevronsUpDown className="size-4 text-gray-800" />
            )
          ) : (
            <ChevronsUpDown className="size-4 text-gray-800" />
          )}
        </span>
      )}
    </Button>
  );
}
