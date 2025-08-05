import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

import HeadingSmall from "@/components/common/heading-small";
import { FormInput } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { type IBreadcrumbItem } from "@/types/shared/navigation";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    title: "Password settings",
    href: "/settings/password",
  },
];

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs} showHeader={false} title="Password settings">
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            description="Ensure your account is using a long, random password to stay secure."
            title="Update Password"
          />

          <form className="space-y-6" onSubmit={updatePassword}>
            <FormInput
              autoComplete="current-password"
              error={errors.current_password}
              id="current_password"
              label="Current Password"
              onChange={(value) => setData("current_password", value)}
              placeholder="Current password"
              ref={currentPasswordInput}
              required
              type="password"
              value={data.current_password}
            />

            <FormInput
              autoComplete="new-password"
              error={errors.password}
              id="password"
              label="New Password"
              onChange={(value) => setData("password", value)}
              placeholder="New password"
              ref={passwordInput}
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

            <div className="flex items-center gap-4">
              <Button disabled={processing} type="submit">
                Save
              </Button>

              <Transition
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
                show={recentlySuccessful}
              >
                <p className="text-muted-foreground text-sm">Saved.</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
