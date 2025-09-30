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
import { useEffect, useState } from "react";

type NavMainProps = {
  items?: INavItem[];
  groups?: INavGroup[];
};

const STORAGE_KEY = "sidebar-collapsible-states";
const getSavedStates = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

function NavItem({ item }: { item: INavItem }) {
  const page = usePage();
  const hasChildren = item.items && item.items.length > 0;
  const hasActiveChild = item.items?.some((subItem) =>
    subItem.href ? isPathActive(subItem.href, page.url) : false,
  );
  const isActive = (item.href ? isPathActive(item.href, page.url) : false) || hasActiveChild;

  const [isOpen, setIsOpen] = useState(() => {
    const savedStates = getSavedStates();
    return savedStates[item.title] || false;
  });

  useEffect(() => {
    const savedStates = getSavedStates();
    const savedState = savedStates[item.title] || false;
    if (savedState !== isOpen) {
      setIsOpen(savedState);
    }
  }, [item.title, page.url]); // Re-sync when page URL changes

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    const savedStates = getSavedStates();
    const updatedStates = { ...savedStates, [item.title]: open };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStates));
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
  const navigationGroups =
    groups.length > 0 ? groups : items.length > 0 ? [{ group: "Platform", items }] : [];

  return (
    <>
      {navigationGroups.map((group) => (
        <SidebarGroup className="px-2 py-0" key={group.group}>
          {(group.showLabel ?? true) ? <SidebarGroupLabel>{group.group}</SidebarGroupLabel> : null}
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
