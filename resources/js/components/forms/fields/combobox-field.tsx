import Combobox, { type Option } from "@/components/ui/combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
} & Omit<React.ComponentProps<typeof Combobox>, "onChange" | "value" | "name">;

export function ComboboxField<T extends FieldValues>({ control, label, name, ...props }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>{label}</FormLabel>
          <FormControl>
            <Combobox
              {...props}
              onChange={field.onChange}
              value={field.value as Option | undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
