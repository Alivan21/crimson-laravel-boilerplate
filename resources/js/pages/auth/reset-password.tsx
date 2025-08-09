import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import { ROUTES } from "@/common/routes";
import { TextField } from "@/components/forms/fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/forms/use-zod-form";
import AuthLayout from "@/layouts/auth-layout";
import { TResetPasswordForm, resetPasswordSchema } from "@/types/modules/auth";

type ResetPasswordProps = {
  token: string;
  email: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const form = useZodForm<TResetPasswordForm>({
    defaultValues: {
      email,
      password: "",
      password_confirmation: "",
      token,
    },
    schema: resetPasswordSchema,
  });

  const { post, processing, transform } = useInertiaForm<TResetPasswordForm>({
    token,
    email,
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (values: TResetPasswordForm) => {
    transform(() => values);
    post(route(ROUTES.AUTH.PASSWORD.STORE), {
      onFinish: () => form.resetField("password"),
    });
  };

  return (
    <AuthLayout description="Enter your new password below" title="Reset password">
      <Head title="Reset Password" />
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4">
            <TextField
              autoComplete="username"
              control={form.control}
              disabled={processing}
              label="Email address"
              name="email"
              placeholder="Email address"
              type="email"
            />

            <TextField
              autoComplete="new-password"
              control={form.control}
              disabled={processing}
              label="Password"
              name="password"
              placeholder="New password"
              type="password"
            />

            <TextField
              autoComplete="new-password"
              control={form.control}
              disabled={processing}
              label="Confirm Password"
              name="password_confirmation"
              placeholder="Confirm password"
              type="password"
            />
          </div>

          <Button disabled={processing} type="submit">
            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
