import { useCallback } from "react";

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
  const handleChange = useCallback(
    (option: TOption | undefined) => {
      onChange(option?.value);
    },
    [onChange],
  );

  return (
    <Combobox
      className="w-full min-w-0"
      onChange={handleChange}
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
  const handleChange = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        onChange(undefined);
        return;
      }
      onChange(formatDateValue(date, column.datePickerProps?.granularity));
    },
    [column.datePickerProps?.granularity, onChange],
  );

  return (
    <DateTimePicker
      className="w-full min-w-0"
      onChange={handleChange}
      placeholder={column.placeholder || `Filter by ${column.title}`}
      value={value}
      {...column.datePickerProps}
    />
  );
};

export function DataTableFilter({ className, columns, params, setParams }: DataTableFilterProps) {
  // Create a memoized change handler for each column
  const createChangeHandler = useCallback(
    (columnId: string) => (value: string | undefined) => {
      setParams((prev) => ({
        ...prev,
        [columnId]: value,
      }));
    },
    [setParams],
  );

  return (
    <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-2", className)}>
      {columns.map((column) => {
        const onChange = createChangeHandler(column.id);

        if (column.type === "select") {
          const value = column.options?.find((option) => option.value === params[column.id]);
          return (
            <SelectFilterItem column={column} key={column.id} onChange={onChange} value={value} />
          );
        }

        if (column.type === "datepicker") {
          const value = params[column.id] ? new Date(params[column.id] as string) : undefined;
          return (
            <DatePickerFilterItem
              column={column}
              key={column.id}
              onChange={onChange}
              value={value}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
