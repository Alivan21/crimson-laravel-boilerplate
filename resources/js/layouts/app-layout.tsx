import FlashMessage from "@/components/common/flash-message";
import { ConfirmDeleteProvider } from "@/components/layout/confirm-delete-provider";
import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";
import { IBreadcrumbItem } from "@/types/shared/navigation";
import { PropsWithChildren, type ReactNode } from "react";
import { Toaster } from "sonner";

type AppLayoutProps = PropsWithChildren<{
  breadcrumbs?: IBreadcrumbItem[];
  title: string;
  topActions?: ReactNode;
  backButton?: ReactNode;
  description?: string;
  showHeader?: boolean;
  className?: string;
}>;

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    <ConfirmDeleteProvider>
      <Toaster closeButton position="top-center" richColors />
      {children}
      <FlashMessage />
    </ConfirmDeleteProvider>
  </AppLayoutTemplate>
);

AppLayout.displayName = "AppLayout";

export default AppLayout;
