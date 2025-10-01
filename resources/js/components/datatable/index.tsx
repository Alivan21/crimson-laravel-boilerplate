import { usePage } from "@inertiajs/react";
import { ReactNode, useCallback, useMemo } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebounceSearchParams from "@/hooks/data-table/use-debounce-search-params";
import { TDataTableParams, TMeta } from "@/types/shared/response";
import { type TFilterableColumn } from "./filter";
import { DataTablePagination } from "./pagination";
import { DataTableSortHeader } from "./sort-header";
import { DataTableToolbar } from "./toolbar";

export type TColumn<TData> = {
  accessorKey?: keyof TData;
  cell?: (row: TData, index: number) => ReactNode;
  enableSorting?: boolean;
  header: string;
  id: string;
  width?: string | number;
};

type DataTableProps<TData> = {
  columns: TColumn<TData>[];
  data: TData[];
  filterComponents?: TFilterableColumn[];
  initialParams?: Partial<TDataTableParams>;
  meta: TMeta;
  searchKey?: string;
  searchPlaceholder?: string;
};

const DEFAULT_COLUMN_WIDTH = 200;

export function DataTable<TData extends { id?: string | number }>({
  columns,
  data,
  filterComponents,
  initialParams = {},
  meta,
  searchKey = "search",
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const { url } = usePage();

  const currentUrl = useMemo(() => url.split("?")[0], [url]);

  const { params, setParams } = useDebounceSearchParams(currentUrl, initialParams);

  const handleSort = useCallback(
    (column: string, direction: "asc" | "desc" | undefined) => {
      setParams((prev) => ({
        ...prev,
        col: column,
        order: direction,
      }));
    },
    [setParams],
  );

  return (
    <div className="w-[calc(100%)] space-y-4">
      <DataTableToolbar
        filterComponents={filterComponents}
        params={params}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        setParams={setParams}
      />
      <ScrollArea className="border-border rounded-sm border">
        <Table>
          <TableHeader className="bg-card">
            <TableRow className="divide-border divide-x">
              {columns.map((column) => (
                <TableHead
                  className="bg-muted text-card-foreground px-2.5 text-sm font-bold"
                  key={column.id}
                  style={{
                    maxWidth: column.width || DEFAULT_COLUMN_WIDTH,
                    minWidth: column.width || DEFAULT_COLUMN_WIDTH,
                    width: column.width || DEFAULT_COLUMN_WIDTH,
                  }}
                >
                  <DataTableSortHeader
                    column={column}
                    currentColumn={params.col as string}
                    currentSort={params.order as "asc" | "desc"}
                    sort={handleSort}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  className="text-muted-foreground h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow
                  className="hover:bg-muted/50"
                  key={row.id !== undefined ? String(row.id) : `row-${i}`}
                >
                  {columns.map((column) => (
                    <TableCell
                      className="text-foreground px-4 break-words"
                      key={column.id}
                      style={{
                        maxWidth: column.width || DEFAULT_COLUMN_WIDTH,
                        minWidth: column.width || DEFAULT_COLUMN_WIDTH,
                        width: column.width || DEFAULT_COLUMN_WIDTH,
                      }}
                    >
                      <div className="break-words whitespace-normal">
                        {column.cell
                          ? column.cell(row, i)
                          : column.accessorKey
                            ? String(row[column.accessorKey])
                            : null}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DataTablePagination meta={meta} setParams={setParams} />
    </div>
  );
}
