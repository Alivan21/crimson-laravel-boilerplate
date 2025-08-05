import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import { ROUTES } from "@/common/routes";
import { FormInput } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";
import { TResetPasswordForm } from "@/types/modules/auth";

interface ResetPasswordProps {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<TResetPasswordForm>>({
    token,
    email,
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route(ROUTES.AUTH.PASSWORD.STORE), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthLayout description="Enter your new password below" title="Reset password">
      <Head title="Reset Password" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <FormInput
            autoComplete="username"
            error={errors.email}
            id="email"
            label="Email address"
            onChange={(value) => setData("email", value)}
            placeholder="Email address"
            required
            type="email"
            value={data.email}
          />

          <FormInput
            autoComplete="new-password"
            error={errors.password}
            id="password"
            label="Password"
            onChange={(value) => setData("password", value)}
            placeholder="New password"
            required
            type="password"
            value={data.password}
          />

          <FormInput
            autoComplete="new-password"
            error={errors.password_confirmation}
            id="password_confirmation"
            label="Confirm Password"
            onChange={(value) => setData("password_confirmation", value)}
            placeholder="Confirm password"
            required
            type="password"
            value={data.password_confirmation}
          />
        </div>

        <Button disabled={processing} type="submit">
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
