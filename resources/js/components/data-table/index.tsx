import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebouncedSearch from "@/hooks/data-table/use-debounce-search";
import { IMeta, ITableParams } from "@/types/shared";
import * as React from "react";
import { useCallback } from "react";
import { type FilterableColumn } from "./filter";
import { DataTablePagination } from "./pagination";
import { DataTableSortHeader } from "./sort-header";
import { DataTableToolbar } from "./toolbar";

export interface Column<TData> {
  id: string;
  header: string;
  accessorKey?: keyof TData;
  cell?: (row: TData, index?: number) => React.ReactNode;
  enableSorting?: boolean;
  width?: string | number;
}

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  initialParams?: Partial<ITableParams>;
  searchPlaceholder?: string;
  searchKey?: string;
  meta: IMeta;
  filterComponents?: FilterableColumn[];
}

export function DataTable<TData>({
  columns,
  data,
  initialParams = {},
  searchPlaceholder = "Search...",
  searchKey = "search",
  meta,
  filterComponents,
}: DataTableProps<TData>) {
  const { params, setParams } = useDebouncedSearch(route(route().current()!)!, initialParams);

  const handleSort = useCallback(
    (column: string, direction: "asc" | "desc" | undefined) => {
      setParams((prev) => ({
        ...prev,
        col: column,
        sort: direction,
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
      <div className="rounded-sm border">
        <Table>
          <TableHeader className="bg-white">
            <TableRow className="divide-x divide-gray-200">
              {columns.map((column) => (
                <TableHead
                  className="bg-muted px-2.5 text-sm font-bold whitespace-nowrap text-black"
                  key={column.id}
                  style={column.width ? { width: column.width } : undefined}
                >
                  <DataTableSortHeader
                    column={column}
                    currentColumn={params.col}
                    currentSort={params.sort}
                    sort={handleSort}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((column) => (
                    <TableCell
                      className="px-4"
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
