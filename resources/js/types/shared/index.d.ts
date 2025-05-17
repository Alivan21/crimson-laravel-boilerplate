import type { Config } from "ziggy-js";

export interface ISharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface IAuthUser {
  user: IUser;
}

export interface IBaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IBaseResponseError {
  message: string;
  errors: Record<string, string[]>;
}

export interface IMeta {
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
}

export interface IPaginationResponse<T> {
  data: T[];
  meta: IMeta;
}

export interface ITableParams {
  limit?: number;
  search?: string;
  col?: string;
  sort?: "asc" | "desc";
  [key: string]: string | number | undefined;
}
