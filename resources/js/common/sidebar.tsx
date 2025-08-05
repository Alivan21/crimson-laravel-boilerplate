import { INavGroup } from "@/types/shared/navigation";
import { Folder, LayoutGrid, Users } from "lucide-react";
import { ROUTES } from "./routes";

export const SIDEBAR_ITEMS: INavGroup[] = [
  {
    group: "Dashboard",
    items: [
      {
        title: "Dashboard",
        href: route(ROUTES.ADMIN.DASHBOARD),
        icon: LayoutGrid,
      },
      {
        title: "Users",
        href: route(ROUTES.ADMIN.USERS.INDEX),
        icon: Users,
      },
    ],
  },
];

export const SIDEBAR_ITEMS_FOOTER = [
  {
    title: "Repository",
    href: "https://github.com/laravel/react-starter-kit",
    icon: Folder,
  },
];
