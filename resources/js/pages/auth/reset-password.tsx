import { zodResolver } from "@hookform/resolvers/zod";
import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/common/routes";
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
import AuthLayout from "@/layouts/auth-layout";
import { TResetPasswordForm, resetPasswordSchema } from "@/types/modules/auth";

interface ResetPasswordProps {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const form = useForm<TResetPasswordForm>({
    defaultValues: {
      token,
      email,
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(resetPasswordSchema),
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
                      autoComplete="username"
                      disabled={processing}
                      placeholder="Email address"
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
                      placeholder="New password"
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
