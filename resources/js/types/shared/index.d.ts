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
  from: number;
  last_page: number;
}

export interface IPaginationResponse<T> {
  data: T[];
  meta: IMeta;
}
