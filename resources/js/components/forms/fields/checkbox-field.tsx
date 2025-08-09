import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
} & Omit<
  React.ComponentProps<typeof Checkbox>,
  "checked" | "defaultChecked" | "name" | "onChange" | "onCheckedChange" | "value"
>;

export function CheckboxField<T extends FieldValues>({ control, label, name, ...props }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onBlur={field.onBlur}
                onCheckedChange={field.onChange}
                {...props}
              />
            </FormControl>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
