import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
} & Omit<
  React.ComponentProps<typeof Switch>,
  "checked" | "defaultChecked" | "name" | "onChange" | "onCheckedChange" | "value"
>;

export function SwitchField<T extends FieldValues>({ control, label, name, ...props }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>{label}</FormLabel>
          <FormControl>
            <Switch
              checked={!!field.value}
              onBlur={field.onBlur}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
