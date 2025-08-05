import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import { ROUTES } from "@/common/routes";
import { FormInput } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<{ password: string }>
  >({
    password: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route(ROUTES.AUTH.PASSWORD.CONFIRM), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AuthLayout
      description="This is a secure area of the application. Please confirm your password before continuing."
      title="Confirm your password"
    >
      <Head title="Confirm password" />

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="space-y-6">
          <FormInput
            autoComplete="current-password"
            error={errors.password}
            id="password"
            label="Password"
            onChange={(value) => setData("password", value)}
            placeholder="Password"
            required
            type="password"
            value={data.password}
          />

          <div className="flex items-center">
            <Button className="w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Confirm password
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
