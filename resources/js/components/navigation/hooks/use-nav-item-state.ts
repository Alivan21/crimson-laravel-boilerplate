import { isPathActive } from "@/common/utils/path-from-href";
import { INavItem } from "@/types/shared/navigation";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

const hasActiveChildRecursive = (items: INavItem[] | undefined, currentUrl: string): boolean => {
  if (!items?.length) return false;

  return items.some((item) => {
    if (item.href && isPathActive(item.href, currentUrl)) return true;
    if (item.items?.length) {
      return hasActiveChildRecursive(item.items, currentUrl);
    }

    return false;
  });
};

export const useNavItemState = (item: INavItem) => {
  const page = usePage();

  const hasChildren = useMemo(() => Boolean(item.items && item.items.length > 0), [item.items]);

  const hasActiveChild = useMemo(() => {
    return hasActiveChildRecursive(item.items, page.url);
  }, [item.items, page.url]);

  const isActive = useMemo(() => {
    if (hasChildren) {
      return hasActiveChild;
    }

    if (item.href) {
      return isPathActive(item.href, page.url);
    }

    return false;
  }, [item.href, page.url, hasActiveChild, hasChildren]);

  return { hasChildren, hasActiveChild, isActive };
};
