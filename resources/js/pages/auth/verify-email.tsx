import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import TextLink from "@/components/common/text-link";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";

interface VerifyEmailProps {
  status?: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <AuthLayout
      description="Please verify your email address by clicking on the link we just emailed to you."
      title="Verify email"
    >
      <Head title="Email verification" />

      {status === "verification-link-sent" && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you provided during
          registration.
        </div>
      )}

      <form className="space-y-6 text-center" onSubmit={submit}>
        <Button disabled={processing} variant="secondary">
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Resend verification email
        </Button>

        <TextLink className="mx-auto block text-sm" href={route("logout")} method="post">
          Log out
        </TextLink>
      </form>
    </AuthLayout>
  );
}
