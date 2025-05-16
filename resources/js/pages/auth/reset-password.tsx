import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/forms/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { ROUTES } from "@/routes";
import { TResetPasswordForm } from "@/types/modules/auth";
interface ResetPasswordProps {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<TResetPasswordForm>>({
    token: token,
    email: email,
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
    <AuthLayout description="Please enter your new password below" title="Reset password">
      <Head title="Reset password" />

      <form onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email"
              className="mt-1 block w-full"
              id="email"
              name="email"
              onChange={(e) => setData("email", e.target.value)}
              readOnly
              type="email"
              value={data.email}
            />
            <InputError className="mt-2" message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="new-password"
              className="mt-1 block w-full"
              id="password"
              name="password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Password"
              type="password"
              value={data.password}
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              autoComplete="new-password"
              className="mt-1 block w-full"
              id="password_confirmation"
              name="password_confirmation"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              placeholder="Confirm password"
              type="password"
              value={data.password_confirmation}
            />
            <InputError className="mt-2" message={errors.password_confirmation} />
          </div>

          <Button className="mt-4 w-full" disabled={processing} type="submit">
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
