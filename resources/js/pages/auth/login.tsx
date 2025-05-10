import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
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
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              autoComplete="email"
              id="email"
              onChange={(e) => setData("email", e.target.value)}
              placeholder="email@example.com"
              required
              type="email"
              value={data.email}
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {canResetPassword && (
                <TextLink className="ml-auto text-sm" href={route("password.request")}>
                  Forgot password?
                </TextLink>
              )}
            </div>
            <Input
              autoComplete="current-password"
              id="password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Password"
              required
              type="password"
              value={data.password}
            />
            <InputError message={errors.password} />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              checked={data.remember}
              id="remember"
              name="remember"
              onClick={() => setData("remember", !data.remember)}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

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
