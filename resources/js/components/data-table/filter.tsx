import Combobox, { type Option } from "@/components/ui/combobox";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { cn } from "@/libs/clsx";
import { ITableParams } from "@/types/shared";

export interface FilterableColumn {
  id: string;
  title: string;
  type: "combobox" | "datepicker";
  options?: Option[];
  placeholder?: string;
  datePickerProps?: {
    granularity?: "year" | "month" | "day" | "second";
    hourCycle?: 12 | 24;
  };
}

interface DataTableFilterProps {
  columns: FilterableColumn[];
  params: ITableParams;
  setParams: (params: (prevParams: ITableParams) => ITableParams) => void;
  className?: string;
}

export function DataTableFilter({ columns, params, setParams, className }: DataTableFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {columns.map((column) => {
        if (column.type === "combobox") {
          return (
            <Combobox
              className="w-fit"
              key={column.id}
              onChange={(option: Option | undefined) => {
                setParams((prev) => ({
                  ...prev,
                  [column.id]: option?.value,
                }));
              }}
              options={column.options}
              placeholder={column.placeholder || `Filter by ${column.title}`}
              value={column.options?.find((option) => option.value === params[column.id])}
            />
          );
        }

        if (column.type === "datepicker") {
          return (
            <DateTimePicker
              className="w-fit"
              key={column.id}
              onChange={(date) => {
                setParams((prev) => ({
                  ...prev,
                  [column.id]: date?.toISOString(),
                }));
              }}
              placeholder={column.placeholder || `Filter by ${column.title}`}
              value={params[column.id] ? new Date(params[column.id] as string) : undefined}
              {...column.datePickerProps}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
