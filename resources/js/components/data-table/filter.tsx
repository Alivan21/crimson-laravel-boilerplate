import Combobox, { type Option } from "@/components/ui/combobox";
import { cn } from "@/libs/clsx";
import { TDataTableParams } from "@/types/shared/response";
import { DateTimePicker } from "../ui/datetime-picker";

export type TFilterableColumn = {
  id: string;
  title: string;
  type: "select" | "datepicker";
  options?: Option[];
  placeholder?: string;
  datePickerProps?: {
    granularity?: "year" | "month" | "day" | "second";
    hourCycle?: 12 | 24;
  };
};

type DataTableFilterProps = {
  columns: TFilterableColumn[];
  params: TDataTableParams;
  setParams: (params: (prevParams: TDataTableParams) => TDataTableParams) => void;
  className?: string;
};

export function DataTableFilter({ columns, params, setParams, className }: DataTableFilterProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-2", className)}>
      {columns.map((column) => {
        if (column.type === "select") {
          return (
            <Combobox
              className="w-full min-w-0"
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
              className="w-full min-w-0"
              key={column.id}
              onChange={(date) => {
                let value: string | undefined;
                if (date) {
                  if (column.datePickerProps?.granularity === "year") {
                    value = date.getFullYear().toString();
                  } else if (column.datePickerProps?.granularity === "month") {
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, "0");
                    value = `${year}-${month}`;
                  } else if (column.datePickerProps?.granularity === "day") {
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, "0");
                    const day = date.getDate().toString().padStart(2, "0");
                    value = `${year}-${month}-${day}`;
                  } else {
                    value = date.toISOString();
                  }
                }
                setParams((prev) => ({
                  ...prev,
                  [column.id]: value,
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
