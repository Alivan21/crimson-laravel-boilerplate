import * as React from "react";

import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/libs/clsx";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.ComponentProps<"input"> & {
  ref?: React.Ref<HTMLInputElement>;
};

function Input({ className, ref, type = "text", ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div className="relative">
      <BaseInput
        className={cn(isPassword && "pr-8", className)}
        ref={ref}
        type={effectiveType}
        {...props}
      />
      {isPassword ? (
        <button
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          aria-pressed={isPasswordVisible}
          className="text-muted-foreground hover:text-foreground absolute inset-y-2.5 right-0 mr-3 flex size-4 cursor-pointer items-center !p-0"
          onClick={() => setIsPasswordVisible((v) => !v)}
          type="button"
        >
          {isPasswordVisible ? (
            <EyeOff aria-hidden="true" className="size-4" />
          ) : (
            <Eye aria-hidden="true" className="size-4" />
          )}
        </button>
      ) : null}
    </div>
  );
}

export default Input;
