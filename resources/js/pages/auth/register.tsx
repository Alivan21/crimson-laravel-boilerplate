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
import { TRegisterForm, registerSchema } from "@/types/modules/auth";

export default function Register() {
  const form = useZodForm<TRegisterForm>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
    schema: registerSchema,
  });

  useFormValidationErrors(form);

  const { post, processing, transform } = useInertiaForm<TRegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (values: TRegisterForm) => {
    transform(() => values);
    post(route(ROUTES.AUTH.REGISTER));
  };

  return (
    <AuthLayout
      description="Enter your details below to create your account"
      title="Create an account"
    >
      <Head title="Register" />
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-5">
            <TextField
              autoComplete="name"
              control={form.control}
              disabled={processing}
              label="Name"
              name="name"
              placeholder="Full name"
              type="text"
            />

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
              autoComplete="new-password"
              control={form.control}
              disabled={processing}
              label="Password"
              name="password"
              placeholder="Password"
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

            <Button className="w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </div>

          <div className="text-muted-foreground text-center text-sm">
            Already have an account? <TextLink href={route(ROUTES.AUTH.LOGIN)}>Login</TextLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
