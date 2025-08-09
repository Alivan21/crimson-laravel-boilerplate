import { zodResolver } from "@hookform/resolvers/zod";
import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/common/routes";
import TextLink from "@/components/common/text-link";
import Input from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import AuthLayout from "@/layouts/auth-layout";
import { TRegisterForm, registerSchema } from "@/types/modules/auth";

export default function Register() {
  const form = useForm<TRegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(registerSchema),
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
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      disabled={processing}
                      placeholder="Full name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      disabled={processing}
                      placeholder="email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      disabled={processing}
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      disabled={processing}
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2 w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </div>

          <div className="text-muted-foreground text-center text-sm">
            Already have an account? <TextLink href={route(ROUTES.AUTH.LOGIN)}>Log in</TextLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
