import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITableParams } from "@/types/shared";

interface DataTablePaginationProps {
  params: ITableParams;
  setParams: (params: (prevParams: ITableParams) => ITableParams) => void;
  total: number;
  lastPage: number;
}

export function DataTablePagination({
  params,
  setParams,
  total,
  lastPage,
}: DataTablePaginationProps) {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  // Calculate the range of items being shown
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex-1 text-sm">
        Showing {from} to {to} of {total} entries
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            onValueChange={(value) => {
              setParams((prev) => ({
                ...prev,
                limit: Number(value),
                page: 1, // Reset to first page when changing limit
              }));
            }}
            value={`${limit}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {lastPage}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) {
                    setParams((prev) => ({
                      ...prev,
                      page: page - 1,
                    }));
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={page >= lastPage ? "pointer-events-none opacity-50" : ""}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < lastPage) {
                    setParams((prev) => ({
                      ...prev,
                      page: page + 1,
                    }));
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
