import Heading from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/libs/clsx";
import { ROUTES } from "@/routes";
import { type INavItem } from "@/types/shared/navigation";
import { Link } from "@inertiajs/react";
import { type PropsWithChildren } from "react";

const sidebarNavItems: INavItem[] = [
  {
    title: "Profile",
    href: route(ROUTES.ADMIN.SETTINGS.PROFILE.EDIT),
    icon: null,
  },
  {
    title: "Password",
    href: route(ROUTES.ADMIN.SETTINGS.PASSWORD.EDIT),
    icon: null,
  },
  {
    title: "Appearance",
    href: route(ROUTES.ADMIN.SETTINGS.APPEARANCE),
    icon: null,
  },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  // When server-side rendering, we only render the layout on the client...
  if (typeof window === "undefined") {
    return null;
  }

  const currentPath = window.location.pathname;

  return (
    <div className="px-4 py-6">
      <Heading description="Manage your profile and account settings" title="Settings" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col space-y-1 space-x-0">
            {sidebarNavItems.map((item, index) => (
              <Button
                asChild
                className={cn("w-full justify-start", {
                  "bg-muted": currentPath === item.href,
                })}
                key={`${item.href}-${index}`}
                size="sm"
                variant="ghost"
              >
                <Link href={item.href} prefetch>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <Separator className="my-6 md:hidden" />

        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  );
}
