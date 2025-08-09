import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import { ROUTES } from "@/common/routes";
import { TextField } from "@/components/forms/fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import { useZodForm } from "@/hooks/forms/use-zod-form";
import AuthLayout from "@/layouts/auth-layout";
import { TConfirmPasswordForm, confirmPasswordSchema } from "@/types/modules/auth";

export default function ConfirmPassword() {
  const form = useZodForm<TConfirmPasswordForm>({
    defaultValues: { password: "" },
    schema: confirmPasswordSchema,
  });

  useFormValidationErrors(form);

  const { post, processing, transform } = useInertiaForm<TConfirmPasswordForm>({ password: "" });

  const handleSubmit = (values: TConfirmPasswordForm) => {
    transform(() => values);
    post(route(ROUTES.AUTH.PASSWORD.CONFIRM), {
      onFinish: () => form.resetField("password"),
      preserveScroll: true,
    });
  };

  return (
    <AuthLayout
      description="This is a secure area of the application. Please confirm your password before continuing."
      title="Confirm your password"
    >
      <Head title="Confirm password" />

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <TextField
            autoComplete="current-password"
            control={form.control}
            disabled={processing}
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />

          <div className="flex items-center">
            <Button className="w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Confirm password
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
