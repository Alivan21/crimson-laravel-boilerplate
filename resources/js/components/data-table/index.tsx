import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebouncedSearch from "@/hooks/data-table/use-debounce-search";
import useSorting from "@/hooks/data-table/use-sorting";
import { ITableParams } from "@/types/shared";
import * as React from "react";
import { type FilterableColumn } from "./filter";
import { DataTablePagination } from "./pagination";
import { DataTableSortHeader } from "./sort-header";
import { DataTableToolbar } from "./toolbar";

export interface Column<TData> {
  id: string;
  header: string;
  accessorKey?: keyof TData;
  cell?: (row: TData) => React.ReactNode;
  enableSorting?: boolean;
}

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  initialParams?: Partial<ITableParams>;
  searchPlaceholder?: string;
  searchKey?: string;
  total: number;
  lastPage: number;
  filterComponents?: FilterableColumn[];
}

export function DataTable<TData>({
  columns,
  data,
  initialParams = {},
  searchPlaceholder = "Search...",
  searchKey = "search",
  total,
  lastPage,
  filterComponents,
}: DataTableProps<TData>) {
  const { params, setParams } = useDebouncedSearch(route(route().current()!), initialParams);
  const { sort } = useSorting((params) => {
    setParams((prev) => ({
      ...prev,
      ...params,
    }));
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        filterComponents={filterComponents}
        params={params}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        setParams={setParams}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>
                  <DataTableSortHeader
                    column={column}
                    currentColumn={params.col}
                    currentSort={params.sort}
                    sort={sort}
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
                    <TableCell key={column.id}>
                      {column.cell
                        ? column.cell(row)
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
      <DataTablePagination
        lastPage={lastPage}
        params={params}
        setParams={setParams}
        total={total}
      />
    </div>
  );
}
