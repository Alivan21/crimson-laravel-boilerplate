import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import TextLink from "@/components/common/text-link";
import { FormInput } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";
import { ROUTES } from "@/routes";

interface ForgotPasswordProps {
  status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

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
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <FormInput
            autoComplete="off"
            error={errors.email}
            id="email"
            label="Email address"
            onChange={(value) => setData("email", value)}
            placeholder="email@example.com"
            required
            type="email"
            value={data.email}
          />

          <div className="flex items-center">
            <Button className="w-full" disabled={processing} type="submit">
              {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Email password reset link
            </Button>
          </div>
        </form>

        <div className="text-muted-foreground space-x-1 text-center text-sm">
          <span>Or, return to</span>
          <TextLink href={route("login")}>log in</TextLink>
        </div>
      </div>
    </AuthLayout>
  );
}
