import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
} & Omit<React.ComponentProps<typeof Textarea>, "name">;

export function TextareaField<T extends FieldValues>({ control, label, name, ...props }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>{label}</FormLabel>
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
