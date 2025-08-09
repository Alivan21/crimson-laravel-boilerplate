import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Path, UseFormReturn } from "react-hook-form";

export function useFormValidationErrors<T extends Record<string, unknown>>(form: UseFormReturn<T>) {
  const { props } = usePage<{
    errors?: Record<string, string>;
  }>();

  useEffect(() => {
    if (props.errors && Object.keys(props.errors).length > 0) {
      // Clear all existing errors first
      form.clearErrors();

      // Set new errors from server
      Object.keys(props.errors).forEach((field) => {
        const errorMessage = props.errors![field];
        if (errorMessage && field in form.formState.defaultValues!) {
          form.setError(field as Path<T>, {
            type: "server",
            message: errorMessage,
          });
        }
      });
    }
  }, [props.errors, form]);

  return props.errors;
}
