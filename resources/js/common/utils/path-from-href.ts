export const getPathFromHref = (href: string) => {
  let pathname = href;

  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      const url = new URL(href);
      pathname = url.pathname;
    } catch {
      return href;
    }
  }

  return pathname.split("?")[0].split("#")[0];
};

/**
 * Compares two URLs by their pathname only, ignoring query parameters and hash fragments
 */
export const isPathActive = (href: string, currentUrl: string) => {
  const hrefPath = getPathFromHref(href);
  const currentPath = getPathFromHref(currentUrl);
  return hrefPath === currentPath;
};
