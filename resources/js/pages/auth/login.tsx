import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import { ROUTES } from "@/common/routes";
import TextLink from "@/components/common/text-link";
import { CheckboxField } from "@/components/forms/fields/checkbox-field";
import { TextField } from "@/components/forms/fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import { useZodForm } from "@/hooks/forms/use-zod-form";
import AuthLayout from "@/layouts/auth-layout";
import { TLoginForm, loginSchema } from "@/types/modules/auth";

type LoginProps = {
  status?: string;
  can_reset_password: boolean;
};

export default function Login({ status, can_reset_password }: LoginProps) {
  const form = useZodForm<TLoginForm>({
    defaultValues: { email: "", password: "", remember: false },
    schema: loginSchema,
  });

  useFormValidationErrors(form);

  const { post, processing, transform } = useInertiaForm<TLoginForm>({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (values: TLoginForm) => {
    transform(() => values);
    post(route(ROUTES.AUTH.LOGIN), {
      onFinish: () => form.resetField("password"),
    });
  };

  return (
    <AuthLayout
      description="Enter your email and password below to login"
      title="Login to your account"
    >
      <Head title="Login" />

      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-5">
            <TextField
              autoComplete="email"
              control={form.control}
              disabled={processing}
              label="Email address"
              name="email"
              placeholder="email@example.com"
              type="email"
            />

            <TextField
              autoComplete="current-password"
              control={form.control}
              disabled={processing}
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
            />
            {can_reset_password && (
              <div className="-mt-3 text-right">
                <TextLink href={route(ROUTES.AUTH.PASSWORD.REQUEST)}>Forgot password?</TextLink>
              </div>
            )}

            <CheckboxField
              control={form.control}
              disabled={processing}
              label="Remember me"
              name="remember"
            />

            <Button className="w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </div>

          <div className="text-muted-foreground text-center text-sm">
            Don't have an account? <TextLink href={route(ROUTES.AUTH.REGISTER)}>Sign up</TextLink>
          </div>
        </form>
      </Form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
      )}
    </AuthLayout>
  );
}
