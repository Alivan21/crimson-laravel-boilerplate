import { Transition } from "@headlessui/react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import HeadingSmall from "@/components/common/heading-small";
import DeleteUser from "@/components/delete-user";
import InputError from "@/components/forms/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { TProfileForm } from "@/types/modules/admin/settings";
import { ISharedData } from "@/types/shared";
import { IBreadcrumbItem } from "@/types/shared/navigation";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    title: "Profile settings",
    href: "/settings/profile",
  },
];

interface ProfileProps {
  must_verify_email: boolean;
  status?: string;
}

export default function Profile({ must_verify_email, status }: ProfileProps) {
  const { auth } = usePage<ISharedData>().props;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<
    Required<TProfileForm>
  >({
    name: auth.user.name,
    email: auth.user.email,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            description="Update your name and email address"
            title="Profile information"
          />

          <form className="space-y-6" onSubmit={submit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>

              <Input
                autoComplete="name"
                className="mt-1 block w-full"
                id="name"
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Full name"
                required
                value={data.name}
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>

              <Input
                autoComplete="username"
                className="mt-1 block w-full"
                id="email"
                onChange={(e) => setData("email", e.target.value)}
                placeholder="Email address"
                required
                type="email"
                value={data.email}
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            {must_verify_email && auth.user.email_verified_at === null && (
              <div>
                <p className="text-muted-foreground -mt-4 text-sm">
                  Your email address is unverified.{" "}
                  <Link
                    as="button"
                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                    href={route("verification.send")}
                    method="post"
                  >
                    Click here to resend the verification email.
                  </Link>
                </p>

                {status === "verification-link-sent" && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    A new verification link has been sent to your email address.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>

              <Transition
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
                show={recentlySuccessful}
              >
                <p className="text-sm text-neutral-600">Saved</p>
              </Transition>
            </div>
          </form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}
