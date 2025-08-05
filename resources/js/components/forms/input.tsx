import { cn } from "@/libs/clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { ROUTES } from "@/common/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextLink from "../common/text-link";
import InputError from "./input-error";

interface FormInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  label: string;
  id: string;
  error?: string;
  withForgotPassword?: boolean;
  className?: string;
  required?: boolean;
  onChange: (value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}

export function FormInput({
  label,
  id,
  withForgotPassword = false,
  error,
  className,
  onChange,
  type = "text",
  required = false,
  ref,
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {withForgotPassword && (
          <TextLink className="ml-auto text-sm" href={route(ROUTES.AUTH.PASSWORD.REQUEST)}>
            Forgot password?
          </TextLink>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          type={inputType}
          {...props}
        />
        {isPassword && (
          <Button
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
            size="icon"
            type="button"
            variant="link"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <InputError message={error} />
    </div>
  );
}
