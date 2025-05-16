import { NavFooter } from "@/components/navigation/nav-footer";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes";
import { type INavItem } from "@/types/shared/navigation";
import { Link } from "@inertiajs/react";
import { BookOpen, Folder, LayoutGrid } from "lucide-react";
import AppLogo from "../icons/app-logo";

const mainNavItems: INavItem[] = [
  {
    title: "Dashboard",
    href: route(ROUTES.ADMIN.DASHBOARD),
    icon: LayoutGrid,
  },
];

const footerNavItems: INavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/laravel/react-starter-kit",
    icon: Folder,
  },
  {
    title: "Documentation",
    href: "https://laravel.com/docs/starter-kits#react",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href={route(ROUTES.ADMIN.DASHBOARD)} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter className="mt-auto" items={footerNavItems} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
