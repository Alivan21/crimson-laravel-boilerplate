import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import { ROUTES } from "@/common/routes";
import TextLink from "@/components/common/text-link";
import { FormCheckbox } from "@/components/forms/checkbox";
import { FormInput } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";
import { TLoginForm } from "@/types/modules/auth";

interface LoginProps {
  status?: string;
  can_reset_password: boolean;
}

export default function Login({ status, can_reset_password }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<TLoginForm>>({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route(ROUTES.AUTH.LOGIN), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AuthLayout
      description="Enter your email and password below to log in"
      title="Log in to your account"
    >
      <Head title="Log in" />

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <FormInput
            autoComplete="email"
            error={errors.email}
            id="email"
            label="Email address"
            onChange={(value) => setData("email", value as string)}
            placeholder="email@example.com"
            required
            type="email"
            value={data.email}
          />

          <FormInput
            autoComplete="current-password"
            error={errors.password}
            id="password"
            label="Password"
            onChange={(value) => setData("password", value as string)}
            placeholder="Password"
            required
            type="password"
            value={data.password}
            withForgotPassword={can_reset_password}
          />

          <FormCheckbox
            checked={data.remember}
            id="remember"
            label="Remember me"
            onChange={(value) => setData("remember", value)}
          />

          <Button className="mt-4 w-full" disabled={processing} type="submit">
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Log in
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Don't have an account? <TextLink href={route("register")}>Sign up</TextLink>
        </div>
      </form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
      )}
    </AuthLayout>
  );
}
