import { Link, usePage } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { createElement, useCallback, useMemo, useState } from "react";

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
import { useCollapsibleStates } from "./hooks/use-collapsible-state";
import { useNavItemState } from "./hooks/use-nav-item-state";

type NavMainProps = {
  items?: INavItem[];
  groups?: INavGroup[];
};

const NavItemContent = ({
  icon,
  title,
}: {
  icon?: React.ComponentType<{ className?: string }> | null;
  title: string;
}) => (
  <>
    {icon && createElement(icon)}
    <span>{title}</span>
  </>
);

const NavSubItem = ({ subItem, currentUrl }: { subItem: INavItem; currentUrl: string }) => {
  const isSubActive = useMemo(
    () => (subItem.href ? isPathActive(subItem.href, currentUrl) : false),
    [subItem.href, currentUrl],
  );

  if (subItem.items && subItem.items.length > 0) {
    return <NavItem item={subItem} />;
  }

  if (subItem.href) {
    return (
      <SidebarMenuSubButton asChild isActive={isSubActive}>
        <Link href={subItem.href} onClick={(e: React.MouseEvent) => e.stopPropagation()} prefetch>
          <NavItemContent icon={subItem.icon} title={subItem.title} />
        </Link>
      </SidebarMenuSubButton>
    );
  }

  return (
    <SidebarMenuSubButton onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <NavItemContent icon={subItem.icon} title={subItem.title} />
    </SidebarMenuSubButton>
  );
};

function NavItem({ item }: { item: INavItem }) {
  const { hasChildren, hasActiveChild, isActive } = useNavItemState(item);
  const { getSavedStates, saveCollapsibleState } = useCollapsibleStates();

  const [isOpen, setIsOpen] = useState(() => {
    const savedStates = getSavedStates();
    if (savedStates[item.title] !== undefined) {
      return savedStates[item.title];
    }
    return hasActiveChild;
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      saveCollapsibleState(item.title, open);
    },
    [item.title, saveCollapsibleState],
  );

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
              <NavItemContent icon={item.icon} title={item.title} />
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
                  <NavSubItem currentUrl={usePage().url} subItem={subItem} />
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
            <NavItemContent icon={item.icon} title={item.title} />
          </Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton tooltip={{ children: item.title }}>
          <NavItemContent icon={item.icon} title={item.title} />
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}

const NavigationGroup = ({ group }: { group: INavGroup }) => (
  <SidebarGroup className="px-2 py-0">
    {(group.showLabel ?? true) && <SidebarGroupLabel>{group.group}</SidebarGroupLabel>}
    <SidebarMenu>
      {group.items.map((item) => (
        <NavItem item={item} key={item.title} />
      ))}
    </SidebarMenu>
  </SidebarGroup>
);

export function NavMain({ items = [], groups = [] }: NavMainProps) {
  const navigationGroups = useMemo(() => {
    if (groups.length > 0) return groups;
    if (items.length > 0) return [{ group: "Platform", items }];
    return [];
  }, [groups, items]);

  const renderContent = useMemo(() => {
    if (navigationGroups.length === 0) return null;

    return navigationGroups.map((group) => <NavigationGroup group={group} key={group.group} />);
  }, [navigationGroups]);

  return <>{renderContent}</>;
}
