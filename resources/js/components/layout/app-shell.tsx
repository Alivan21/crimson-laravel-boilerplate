import { SidebarProvider } from "@/components/ui/sidebar";
import { ISharedData } from "@/types/shared";
import { usePage } from "@inertiajs/react";

type AppShellProps = {
  children: React.ReactNode;
  variant?: "header" | "sidebar";
};

export function AppShell({ children, variant = "header" }: AppShellProps) {
  const isOpen = usePage<ISharedData>().props.sidebarOpen;

  if (variant === "header") {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
