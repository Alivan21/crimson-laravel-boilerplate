import { ROUTES } from "@/common/routes";
import { DataTable, TColumn } from "@/components/data-table";
import { TFilterableColumn } from "@/components/data-table/filter";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import { TPaginatedUserResponse } from "@/types/modules/admin/user";
import { IUser } from "@/types/shared";
import { IBreadcrumbItem } from "@/types/shared/navigation";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    title: "Users",
    href: route(ROUTES.ADMIN.USERS.INDEX),
  },
];

interface UsersProps {
  data: TPaginatedUserResponse;
}

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
      cell: (row: IUser) => (
        <Badge variant={row.is_active ? "default" : "destructive"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "created_at",
      header: "Created At",
      accessorKey: "created_at",
      cell: (row: IUser) => new Date(row.created_at).toLocaleDateString(),
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
