import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import { ROUTES } from "@/common/routes";
import TextLink from "@/components/common/text-link";
import { TextField } from "@/components/forms/fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import { useZodForm } from "@/hooks/forms/use-zod-form";
import AuthLayout from "@/layouts/auth-layout";
import { TForgotPasswordForm, forgotPasswordSchema } from "@/types/modules/auth";

type ForgotPasswordProps = {
  status?: string;
};

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const form = useZodForm<TForgotPasswordForm>({
    defaultValues: { email: "" },
    schema: forgotPasswordSchema,
  });

  useFormValidationErrors(form);

  const { post, processing, transform } = useInertiaForm<TForgotPasswordForm>({ email: "" });

  const handleSubmit = (values: TForgotPasswordForm) => {
    transform(() => values);
    post(route(ROUTES.AUTH.PASSWORD.EMAIL));
  };

  return (
    <AuthLayout
      description="Enter your email to receive a password reset link"
      title="Forgot password"
    >
      <Head title="Forgot password" />

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
      )}

      <div className="space-y-6">
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
            <TextField
              autoComplete="off"
              control={form.control}
              disabled={processing}
              label="Email address"
              name="email"
              placeholder="email@example.com"
              type="email"
            />

            <div className="flex items-center">
              <Button className="w-full" disabled={processing} type="submit">
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Email password reset link
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-muted-foreground space-x-1 text-center text-sm">
          <span>Or, return to</span>
          <TextLink href={route(ROUTES.AUTH.LOGIN)}>log in</TextLink>
        </div>
      </div>
    </AuthLayout>
  );
}
