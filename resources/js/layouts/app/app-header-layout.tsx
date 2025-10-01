import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AppLogo from "@/components/icons/app-logo";
import { AppContent } from "@/components/layout/app-content";
import { AppShell } from "@/components/layout/app-shell";
import { UserMenuContent } from "@/components/navigation/user-menu-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInitials } from "@/hooks/shared/use-initials";
import { cn } from "@/libs/clsx";
import { type ISharedData } from "@/types/shared";
import { type IBreadcrumbItem, type INavItem } from "@/types/shared/navigation";
import { Head, Link, usePage } from "@inertiajs/react";
import { Bell, ChevronLeft } from "lucide-react";
import { type PropsWithChildren, type ReactNode } from "react";

type AppHeaderLayoutProps = PropsWithChildren<{
  breadcrumbs?: IBreadcrumbItem[];
  title: string;
  onBack?: () => void;
  topActions?: ReactNode;
  description?: string;
  showHeader?: boolean;
  className?: string;
  navItems?: INavItem[];
}>;

export default function AppHeaderLayout({
  children,
  breadcrumbs = [],
  title,
  onBack,
  topActions,
  description,
  showHeader = true,
  className,
  navItems = [],
}: AppHeaderLayoutProps) {
  const { auth } = usePage<ISharedData>().props;
  const getInitials = useInitials();

  return (
    <AppShell variant="header">
      <Head title={title} />
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-16 w-full items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <AppLogo />
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                asChild
                className={cn(item.isActive ? "" : "text-muted-foreground")}
                key={item.title}
                size="sm"
                variant={item.isActive ? "default" : "ghost"}
              >
                <Link href={item.href} prefetch>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button aria-label="Notifications" size="icon" variant="ghost">
              <Bell className="size-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open user menu"
                  className="rounded-full p-0"
                  size="icon"
                  variant="ghost"
                >
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage alt={auth.user.name} src={auth.user.avatar} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-56 rounded-lg">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <AppContent className={cn("gap-4 p-4 sm:p-6", className)} variant="header">
        {breadcrumbs.length > 0 && (
          <div className="-mb-2">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        )}

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

        <main className="flex-1 overflow-hidden p-5 sm:p-2.5">{children}</main>
      </AppContent>
    </AppShell>
  );
}
