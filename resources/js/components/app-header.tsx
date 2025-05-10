import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserMenuContent } from "@/components/user-menu-content";
import { useInitials } from "@/hooks/use-initials";
import { cn } from "@/lib/utils";
import { type BreadcrumbItem, type NavItem, type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { BookOpen, Folder, LayoutGrid, Menu, Search } from "lucide-react";
import AppLogo from "./app-logo";
import AppLogoIcon from "./app-logo-icon";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
];

const rightNavItems: NavItem[] = [
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

const activeItemStyles = "text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const getInitials = useInitials();
  return (
    <>
      <div className="border-sidebar-border/80 border-b">
        <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="mr-2 h-[34px] w-[34px]" size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between"
                side="left"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetHeader className="flex justify-start text-left">
                  <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                </SheetHeader>
                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                  <div className="flex h-full flex-col justify-between text-sm">
                    <div className="flex flex-col space-y-4">
                      {mainNavItems.map((item) => (
                        <Link
                          className="flex items-center space-x-2 font-medium"
                          href={item.href}
                          key={item.title}
                        >
                          {item.icon && <Icon className="h-5 w-5" iconNode={item.icon} />}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-4">
                      {rightNavItems.map((item) => (
                        <a
                          className="flex items-center space-x-2 font-medium"
                          href={item.href}
                          key={item.title}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {item.icon && <Icon className="h-5 w-5" iconNode={item.icon} />}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link className="flex items-center space-x-2" href="/dashboard" prefetch>
            <AppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
            <NavigationMenu className="flex h-full items-stretch">
              <NavigationMenuList className="flex h-full items-stretch space-x-2">
                {mainNavItems.map((item, index) => (
                  <NavigationMenuItem className="relative flex h-full items-center" key={index}>
                    <Link
                      className={cn(
                        navigationMenuTriggerStyle(),
                        page.url === item.href && activeItemStyles,
                        "h-9 cursor-pointer px-3",
                      )}
                      href={item.href}
                    >
                      {item.icon && <Icon className="mr-2 h-4 w-4" iconNode={item.icon} />}
                      {item.title}
                    </Link>
                    {page.url === item.href && (
                      <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white" />
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative flex items-center space-x-1">
              <Button className="group h-9 w-9 cursor-pointer" size="icon" variant="ghost">
                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
              </Button>
              <div className="hidden lg:flex">
                {rightNavItems.map((item) => (
                  <TooltipProvider delayDuration={0} key={item.title}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                          href={item.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="sr-only">{item.title}</span>
                          {item.icon && (
                            <Icon
                              className="size-5 opacity-80 group-hover:opacity-100"
                              iconNode={item.icon}
                            />
                          )}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="size-10 rounded-full p-1" variant="ghost">
                  <Avatar className="size-8 overflow-hidden rounded-full">
                    <AvatarImage alt={auth.user.name} src={auth.user.avatar} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        <div className="border-sidebar-border/70 flex w-full border-b">
          <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}
