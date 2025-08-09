import { FileUpload } from "@/components/forms/common/file-upload";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
} & Omit<React.ComponentProps<typeof FileUpload>, "file" | "onFileChange" | "name">;

export function FileUploadField<T extends FieldValues>({
  control,
  label,
  name,
  ...props
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>{label}</FormLabel>
          <FormControl>
            <FileUpload file={field.value} onFileChange={field.onChange} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
