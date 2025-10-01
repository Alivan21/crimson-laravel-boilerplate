import { ROUTES } from "@/common/routes";
import { DataTable, TColumn } from "@/components/datatable";
import { TFilterableColumn } from "@/components/datatable/filter";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import { TPaginatedUserResponse } from "@/types/modules/admin/user";
import { IUser } from "@/types/shared";
import { IBreadcrumbItem } from "@/types/shared/navigation";
import { format } from "date-fns";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: route(ROUTES.ADMIN.DASHBOARD),
  },
  {
    title: "Users",
    href: route(ROUTES.ADMIN.USERS.INDEX),
  },
];

type UsersProps = {
  data: TPaginatedUserResponse;
};

export default function Users({ data }: UsersProps) {
  const columns: TColumn<IUser>[] = [
    {
      id: "id",
      header: "No",
      enableSorting: false,
      accessorKey: "id",
      width: 50,
      cell: (_, index) => (index !== undefined ? index + 1 : ""),
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "is_active",
      header: "Status",
      accessorKey: "is_active",
      enableSorting: true,
      cell: (row) => (
        <Badge variant={row.is_active ? "success" : "destructive"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "created_at",
      header: "Created At",
      accessorKey: "created_at",
      cell: (row) => format(row.created_at, "dd MMM yyyy"),
    },
  ];

  const filters: TFilterableColumn[] = [
    {
      id: "is_active",
      title: "Status",
      type: "select",
      options: [
        { label: "Active", value: "1" },
        { label: "Inactive", value: "0" },
      ],
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs} title="Users">
      <DataTable
        columns={columns}
        data={data.items}
        filterComponents={filters}
        meta={data.meta}
        searchKey="search"
        searchPlaceholder="Search users..."
      />
    </AppLayout>
  );
}
