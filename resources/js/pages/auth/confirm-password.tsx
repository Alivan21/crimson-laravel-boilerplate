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
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import AuthLayout from "@/layouts/auth-layout";
import { TConfirmPasswordForm, confirmPasswordSchema } from "@/types/modules/auth";

export default function ConfirmPassword() {
  const form = useForm<TConfirmPasswordForm>({
    defaultValues: { password: "" },
    resolver: zodResolver(confirmPasswordSchema),
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
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Password</FormLabel>
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

            <div className="flex items-center">
              <Button className="w-full" disabled={processing} type="submit">
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Confirm password
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
