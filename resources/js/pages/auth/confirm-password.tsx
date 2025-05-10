// Components
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/forms/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<{ password: string }>
  >({
    password: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.confirm"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AuthLayout
      description="This is a secure area of the application. Please confirm your password before continuing."
      title="Confirm your password"
    >
      <Head title="Confirm password" />

      <form onSubmit={submit}>
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="current-password"
              id="password"
              name="password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Password"
              type="password"
              value={data.password}
            />

            <InputError message={errors.password} />
          </div>

          <div className="flex items-center">
            <Button className="w-full" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Confirm password
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
