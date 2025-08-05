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
import { usePage } from "@inertiajs/react";
import * as React from "react";
import { useCallback } from "react";
import { type TFilterableColumn } from "./filter";
import { DataTablePagination } from "./pagination";
import { DataTableSortHeader } from "./sort-header";
import { DataTableToolbar } from "./toolbar";

export type TColumn<TData> = {
  id: string;
  header: string;
  accessorKey?: keyof TData;
  cell?: (row: TData, index: number) => React.ReactNode;
  enableSorting?: boolean;
  width?: string | number;
};

type DataTableProps<TData> = {
  columns: TColumn<TData>[];
  data: TData[];
  initialParams?: Partial<TDataTableParams>;
  searchPlaceholder?: string;
  searchKey?: string;
  meta: TMeta;
  filterComponents?: TFilterableColumn[];
};

export function DataTable<TData>({
  columns,
  data,
  initialParams = {},
  searchPlaceholder = "Search...",
  searchKey = "search",
  meta,
  filterComponents,
}: DataTableProps<TData>) {
  const { url } = usePage();
  const currentUrl = url.split("?")[0];
  const { params, setParams } = useDebounceSearchParams(currentUrl, initialParams);

  const handleSort = useCallback(
    (column: string, direction: "asc" | "desc" | undefined) => {
      setParams((prev) => ({
        ...prev,
        sort_by: column,
        order: direction,
      }));
    },
    [setParams],
  );

  return (
    <div className="space-y-4">
      <DataTableToolbar
        filterComponents={filterComponents}
        params={params}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        setParams={setParams}
      />
      <div className="border-border rounded-sm border">
        <Table>
          <TableHeader className="bg-card">
            <TableRow className="divide-border divide-x">
              {columns.map((column) => (
                <TableHead
                  className="bg-muted text-card-foreground max-w-fit px-2.5 text-sm font-bold"
                  key={column.id}
                  style={
                    column.width
                      ? {
                          width: column.width,
                        }
                      : undefined
                  }
                >
                  <DataTableSortHeader
                    column={column}
                    currentColumn={params.sort_by as string}
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
                <TableRow className="hover:bg-muted/50" key={i}>
                  {columns.map((column) => (
                    <TableCell
                      className="text-foreground px-4"
                      key={column.id}
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {column.cell
                        ? column.cell(row, i)
                        : column.accessorKey
                          ? String(row[column.accessorKey])
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination meta={meta} setParams={setParams} />
    </div>
  );
}
