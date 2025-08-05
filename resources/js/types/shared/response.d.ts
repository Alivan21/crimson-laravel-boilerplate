export type TMeta = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type TPaginationResponse<T> = {
  items: T[];
  meta: TMeta;
};

export type TDataTableParams = {
  search?: string;
  sort_by?: string;
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
  [key: string]: string | number | boolean | undefined;
};
