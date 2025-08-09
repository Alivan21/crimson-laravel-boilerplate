import { ROUTES } from "@/common/routes";
import { UserInfo } from "@/components/navigation/user-info";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useMobileNavigation } from "@/hooks/shared/use-mobile-navigation";
import { type IUser } from "@/types/shared";
import { Link, router } from "@inertiajs/react";
import { LogOut, Settings } from "lucide-react";

type UserMenuContentProps = {
  user: IUser;
};

export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation();

  const handleLogout = () => {
    cleanup();
    router.flushAll();
  };

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo showEmail={true} user={user} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            as="button"
            className="block w-full cursor-pointer"
            href={route(ROUTES.ADMIN.SETTINGS.PROFILE.EDIT)}
            onClick={cleanup}
            prefetch
          >
            <Settings className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          as="button"
          className="block w-full cursor-pointer"
          href={route(ROUTES.AUTH.LOGOUT)}
          method="post"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" />
          Log out
        </Link>
      </DropdownMenuItem>
    </>
  );
}
