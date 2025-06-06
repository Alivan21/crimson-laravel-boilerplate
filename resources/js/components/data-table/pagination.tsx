import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMeta, ITableParams } from "@/types/shared";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo } from "react";

interface DataTablePaginationProps {
  setParams: (params: (prevParams: ITableParams) => ITableParams) => void;
  meta: IMeta;
}

export function DataTablePagination({ setParams, meta }: DataTablePaginationProps) {
  const page = meta.current_page;
  const limit = meta.per_page;

  const handlePageChange = useCallback(
    (newPage: number) => {
      setParams((prev) => ({
        ...prev,
        page: newPage,
      }));
    },
    [setParams],
  );

  const handleLimitChange = useCallback(
    (value: string) => {
      setParams((prev) => ({
        ...prev,
        limit: Number(value),
        page: 1,
      }));
    },
    [setParams],
  );

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(meta.last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, meta.last_page]);

  const pageSizeOptions = useMemo(() => [10, 20, 30, 50], []);

  return (
    <div className="flex w-full flex-col items-center justify-end gap-4 sm:flex-row">
      <div className="text-muted-foreground text-sm">
        {meta.from} - {meta.to} of {meta.total} items
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select onValueChange={handleLimitChange} value={`${limit}`}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Pagination>
        <PaginationContent className="flex-wrap">
          <PaginationItem>
            <PaginationLink
              aria-label="Go to first page"
              className="h-8 w-8 p-0"
              disabled={page === 1}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
            >
              <ChevronFirst className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              aria-label="Go to previous page"
              className="h-8 w-8 p-0"
              disabled={page === 1}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          {pageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className="h-8 w-8 p-0"
                href="#"
                isActive={pageNumber === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              aria-label="Go to next page"
              className="h-8 w-8 p-0"
              disabled={page === meta.last_page}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              aria-label="Go to last page"
              className="h-8 w-8 p-0"
              disabled={page === meta.last_page}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(meta.last_page);
              }}
            >
              <ChevronLast className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
