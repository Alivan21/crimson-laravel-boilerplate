import { LucideIcon } from "lucide-react";

export type IBreadcrumbItem = {
  title: string;
  href: string;
};

export type INavGroup = {
  group: string;
  showLabel?: boolean;
  items: INavItem[];
};

export type INavItem = {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
  items?: NavItem[];
};
