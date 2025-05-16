import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";
import { type IBreadcrumbItem } from "@/types/shared/navigation";
import { type ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: IBreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    {children}
  </AppLayoutTemplate>
);

export default AppLayout;
