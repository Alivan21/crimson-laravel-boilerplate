import { AppContent } from "@/components/layout/app-content";
import { AppShell } from "@/components/layout/app-shell";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppSidebarHeader } from "@/components/layout/app-sidebar-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/clsx";
import { IBreadcrumbItem } from "@/types/shared/navigation";
import { Head } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { ReactNode, type PropsWithChildren } from "react";

type AppSidebarLayoutProps = PropsWithChildren<{
  breadcrumbs?: IBreadcrumbItem[];
  title: string;
  onBack?: () => void;
  topActions?: ReactNode;
  description?: string;
  showHeader?: boolean;
  className?: string;
}>;

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
  title,
  onBack,
  topActions,
  description,
  showHeader = true,
  className,
}: AppSidebarLayoutProps) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        <Head title={title} />
        <main
          className={cn("flex h-full flex-1 flex-col gap-4 rounded-xl", {
            "p-2.5 sm:p-4": showHeader,
            "px-2.5": !showHeader,
          })}
        >
          {showHeader && (
            <div className="flex flex-col gap-1 px-5 sm:gap-2 sm:px-2.5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <header className="flex items-center gap-2">
                  {onBack && (
                    <Button
                      aria-label="Go back"
                      className="h-8 w-8 shrink-0"
                      onClick={onBack}
                      size="icon"
                      variant="ghost"
                    >
                      <ChevronLeft className="size-5" />
                    </Button>
                  )}
                  <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
                </header>
                {topActions && <div className="flex shrink-0">{topActions}</div>}
              </div>
              {description && (
                <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
              )}
            </div>
          )}
          <div className={cn("flex-1 overflow-hidden p-5 sm:p-2.5", className)}>{children}</div>
        </main>
      </AppContent>
    </AppShell>
  );
}
