import { cn } from "@/libs/clsx";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import InputError from "./input-error";

interface FormCheckboxProps
  extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "onChange"> {
  label: string;
  id: string;
  error?: string;
  className?: string;
  required?: boolean;
  onChange: (value: boolean) => void;
  ref?: React.Ref<HTMLButtonElement>;
}

export function FormCheckbox({
  label,
  id,
  error,
  className,
  onChange,
  checked,
  required = false,
  ref,
  ...props
}: FormCheckboxProps) {
  return (
    <div className={cn("flex w-fit cursor-pointer items-center space-x-3", className)}>
      <Checkbox
        checked={checked}
        id={id}
        name={id}
        onClick={() => onChange(!checked)}
        ref={ref}
        {...props}
      />
      <Label className="cursor-pointer" htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <InputError message={error} />
    </div>
  );
}
