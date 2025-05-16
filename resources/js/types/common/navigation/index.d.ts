import { LucideIcon } from "lucide-react";

export interface IBreadcrumbItem {
  title: string;
  href: string;
}

export interface INavGroup {
  title: string;
  items: INavItem[];
}

export interface INavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}
