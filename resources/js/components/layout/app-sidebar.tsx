import { ROUTES } from "@/common/routes";
import { SIDEBAR_ITEMS, SIDEBAR_ITEMS_FOOTER } from "@/common/sidebar";
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
import { Link } from "@inertiajs/react";
import { memo } from "react";
import AppLogo from "../icons/app-logo";

export const AppSidebar = memo(() => {
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
        <NavMain groups={SIDEBAR_ITEMS} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={SIDEBAR_ITEMS_FOOTER} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
});

AppSidebar.displayName = "AppSidebar";
