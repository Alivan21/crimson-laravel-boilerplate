import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import TextLink from "@/components/common/text-link";
import InputError from "@/components/forms/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { TRegisterForm } from "@/types/modules/auth";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<TRegisterForm>>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthLayout
      description="Enter your details below to create your account"
      title="Create an account"
    >
      <Head title="Register" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              autoComplete="name"
              disabled={processing}
              id="name"
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Full name"
              required
              type="text"
              value={data.name}
            />
            <InputError className="mt-2" message={errors.name} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              autoComplete="email"
              disabled={processing}
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
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="new-password"
              disabled={processing}
              id="password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Password"
              required
              type="password"
              value={data.password}
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              autoComplete="new-password"
              disabled={processing}
              id="password_confirmation"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              placeholder="Confirm password"
              required
              type="password"
              value={data.password_confirmation}
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button className="mt-2 w-full" disabled={processing} type="submit">
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Already have an account? <TextLink href={route("login")}>Log in</TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}
