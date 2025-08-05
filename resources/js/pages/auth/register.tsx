import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import { ROUTES } from "@/common/routes";
import TextLink from "@/components/common/text-link";
import { FormInput } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
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
    post(route(ROUTES.AUTH.REGISTER), {
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
          <FormInput
            autoComplete="name"
            error={errors.name}
            id="name"
            label="Name"
            onChange={(value) => setData("name", value)}
            placeholder="Full name"
            required
            type="text"
            value={data.name}
          />

          <FormInput
            autoComplete="email"
            error={errors.email}
            id="email"
            label="Email address"
            onChange={(value) => setData("email", value)}
            placeholder="email@example.com"
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
            placeholder="Password"
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
