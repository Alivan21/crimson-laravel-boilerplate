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
import { TForgotPasswordForm, forgotPasswordSchema } from "@/types/modules/auth";

type ForgotPasswordProps = {
  status?: string;
};

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const form = useForm<TForgotPasswordForm>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
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
          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
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
