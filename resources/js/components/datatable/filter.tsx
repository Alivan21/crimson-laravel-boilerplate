import Combobox, { type TOption } from "@/components/ui/combobox";
import { cn } from "@/libs/clsx";
import { TDataTableParams } from "@/types/shared/response";
import { DateTimePicker } from "../ui/datetime-picker";

export type TFilterableColumn = {
  datePickerProps?: {
    granularity?: "year" | "month" | "day" | "second";
    hourCycle?: 12 | 24;
  };
  id: string;
  options?: TOption[];
  placeholder?: string;
  title: string;
  type: "select" | "datepicker";
};

type DataTableFilterProps = {
  className?: string;
  columns: TFilterableColumn[];
  params: TDataTableParams;
  setParams: (params: (prevParams: TDataTableParams) => TDataTableParams) => void;
};

/**
 * Utility function to format date based on granularity
 */
const formatDateValue = (date: Date, granularity?: "year" | "month" | "day" | "second"): string => {
  if (granularity === "year") {
    return date.getFullYear().toString();
  }

  if (granularity === "month") {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  }

  if (granularity === "day") {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return date.toISOString();
};

/**
 * Individual filter item component for select type
 */
const SelectFilterItem = ({
  column,
  onChange,
  value,
}: {
  column: TFilterableColumn;
  onChange: (value: string | undefined) => void;
  value: TOption | undefined;
}) => {
  return (
    <Combobox
      className="w-full min-w-0"
      onChange={(option) => onChange(option?.value)}
      options={column.options}
      placeholder={column.placeholder || `Filter by ${column.title}`}
      value={value}
    />
  );
};

/**
 * Individual filter item component for datepicker type
 */
const DatePickerFilterItem = ({
  column,
  onChange,
  value,
}: {
  column: TFilterableColumn;
  onChange: (value: string | undefined) => void;
  value: Date | undefined;
}) => {
  return (
    <DateTimePicker
      className="w-full min-w-0"
      onChange={(date) => {
        if (!date) {
          onChange(undefined);
          return;
        }
        onChange(formatDateValue(date, column.datePickerProps?.granularity));
      }}
      placeholder={column.placeholder || `Filter by ${column.title}`}
      value={value}
      {...column.datePickerProps}
    />
  );
};

export function DataTableFilter({ className, columns, params, setParams }: DataTableFilterProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-2", className)}>
      {columns.map((column) => {
        const handleChange = (value: string | undefined) => {
          setParams((prev) => ({
            ...prev,
            [column.id]: value,
          }));
        };

        if (column.type === "select") {
          const value = params[column.id]
            ? column.options?.find((option) => option.value === params[column.id])
            : undefined;

          return (
            <SelectFilterItem
              column={column}
              key={column.id}
              onChange={handleChange}
              value={value}
            />
          );
        }

        if (column.type === "datepicker") {
          const value = params[column.id] ? new Date(params[column.id] as string) : undefined;

          return (
            <DatePickerFilterItem
              column={column}
              key={column.id}
              onChange={handleChange}
              value={value}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
