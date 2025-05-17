import Combobox, { ComboboxRef, Option } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/clsx";
import InputError from "./input-error";

interface FormComboboxProps extends Omit<React.ComponentProps<typeof Combobox>, "onChange"> {
  label: string;
  id: string;
  error?: string;
  className?: string;
  required?: boolean;
  onChange: (value: Option | undefined) => void;
  ref?: React.Ref<ComboboxRef>;
}

export function FormCombobox({
  label,
  id,
  error,
  className,
  onChange,
  value,
  required = false,
  ref,
  ...props
}: FormComboboxProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Combobox className="w-full" id={id} onChange={onChange} ref={ref} value={value} {...props} />
      <InputError message={error} />
    </div>
  );
}
