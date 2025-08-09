import type { Config } from "ziggy-js";

export type ISharedData = {
  name: string;
  quote: { message: string; author: string };
  auth: IAuthUser;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
};

export type IUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  [key: string]: unknown;
};

export type IAuthUser = {
  user: IUser;
};
