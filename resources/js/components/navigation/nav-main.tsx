import { isPathActive } from "@/common/utils/path-from-href";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { type INavGroup, type INavItem } from "@/types/shared/navigation";
import { Link, usePage } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NavMainProps = {
  items?: INavItem[];
  groups?: INavGroup[];
};

const STORAGE_KEY = "sidebar-collapsible-states";

const getSavedStates = (): Record<string, boolean> => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
};

const saveCollapsibleState = (itemTitle: string, isOpen: boolean): void => {
  try {
    const savedStates = getSavedStates();
    const updatedStates = { ...savedStates, [itemTitle]: isOpen };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStates));
  } catch {
    // Silently fail if sessionStorage is not available
  }
};

function NavItem({ item }: { item: INavItem }) {
  const page = usePage();

  const hasChildren = useMemo(() => item.items && item.items.length > 0, [item.items]);
  const hasActiveChild = useMemo(
    () =>
      item.items?.some((subItem) => (subItem.href ? isPathActive(subItem.href, page.url) : false)),
    [item.items, page.url],
  );
  const isActive = useMemo(
    () => (item.href ? isPathActive(item.href, page.url) : false) || hasActiveChild,
    [item.href, page.url, hasActiveChild],
  );

  // Initialize state: check saved state OR auto-open if has active child
  const [isOpen, setIsOpen] = useState(() => {
    const savedStates = getSavedStates();
    if (savedStates[item.title] !== undefined) {
      return savedStates[item.title];
    }
    // Compute hasActiveChild inline for initial state
    return (
      item.items?.some((subItem) =>
        subItem.href ? isPathActive(subItem.href, page.url) : false,
      ) ?? false
    );
  });

  // Auto-expand when navigating to a page with active child
  useEffect(() => {
    if (hasActiveChild && !isOpen) {
      setIsOpen(true);
      saveCollapsibleState(item.title, true);
    }
  }, [hasActiveChild, isOpen, item.title]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    saveCollapsibleState(item.title, open);
  };

  if (hasChildren) {
    return (
      <Collapsible onOpenChange={handleOpenChange} open={isOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className="w-full cursor-pointer"
              isActive={isActive}
              tooltip={{ children: item.title }}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight
                className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent
            className="collapsible-content"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  {subItem.items && subItem.items.length > 0 ? (
                    <NavItem item={subItem} />
                  ) : subItem.href ? (
                    <SidebarMenuSubButton asChild isActive={isPathActive(subItem.href, page.url)}>
                      <Link
                        href={subItem.href}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        prefetch
                      >
                        {subItem.icon && <subItem.icon />}
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  ) : (
                    <SidebarMenuSubButton onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  )}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      {item.href ? (
        <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
          <Link href={item.href} prefetch>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton tooltip={{ children: item.title }}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}

export function NavMain({ items = [], groups = [] }: NavMainProps) {
  const navigationGroups = useMemo(() => {
    if (groups.length > 0) return groups;
    if (items.length > 0) return [{ group: "Platform", items }];
    return [];
  }, [groups, items]);

  if (navigationGroups.length === 0) return null;

  return (
    <>
      {navigationGroups.map((group) => (
        <SidebarGroup className="px-2 py-0" key={group.group}>
          {(group.showLabel ?? true) && <SidebarGroupLabel>{group.group}</SidebarGroupLabel>}
          <SidebarMenu>
            {group.items.map((item) => (
              <NavItem item={item} key={item.title} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
