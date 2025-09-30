import Combobox from "@/components/ui/combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
  required?: boolean;
} & Omit<React.ComponentProps<typeof Combobox>, "onChange" | "value" | "name">;

export function ComboboxField<T extends FieldValues>({
  control,
  label,
  name,
  required,
  ...props
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption = field.value
          ? props.options?.find((option) => option.value === field.value)
          : undefined;

        return (
          <FormItem>
            <FormLabel required={required}>{label}</FormLabel>
            <FormControl>
              <Combobox
                {...props}
                onChange={(option) => field.onChange(option?.value)}
                value={selectedOption}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
