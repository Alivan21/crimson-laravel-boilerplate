import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/libs/clsx"

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  required?: boolean
}

function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      data-slot="label"
      {...props}
    >
      {children}
      {required ? <span className="text-destructive"> *</span> : null}
    </LabelPrimitive.Root>
  )
}

export { Label }
