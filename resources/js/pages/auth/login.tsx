import { zodResolver } from "@hookform/resolvers/zod";
import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/common/routes";
import TextLink from "@/components/common/text-link";
import Input from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { TLoginForm, loginSchema } from "@/types/modules/auth";

interface LoginProps {
  status?: string;
  can_reset_password: boolean;
}

export default function Login({ status, can_reset_password }: LoginProps) {
  const form = useForm<TLoginForm>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: zodResolver(loginSchema),
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
      description="Enter your email and password below to log in"
      title="Log in to your account"
    >
      <Head title="Log in" />

      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-6">
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
                  <div className="flex items-center justify-between">
                    <FormLabel required>Password</FormLabel>
                    {can_reset_password && (
                      <TextLink href={route(ROUTES.AUTH.PASSWORD.REQUEST)}>
                        Forgot password?
                      </TextLink>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
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
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={processing}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4 w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Log in
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
