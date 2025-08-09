import { Transition } from "@headlessui/react";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useRef } from "react";

import { ROUTES } from "@/common/routes";
import HeadingSmall from "@/components/common/heading-small";
import { TextField } from "@/components/forms/fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import { useZodForm } from "@/hooks/forms/use-zod-form";
import AppLayout from "@/layouts/app-layout";
import { TPasswordForm, passwordSchema } from "@/types/modules/admin/settings";
import { type IBreadcrumbItem } from "@/types/shared/navigation";
import SettingsLayout from "./_layout";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    title: "Password settings",
    href: "/settings/password",
  },
];

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const form = useZodForm<TPasswordForm>({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    schema: passwordSchema,
  });
  useFormValidationErrors(form);

  const { put, reset, processing, recentlySuccessful, transform } = useInertiaForm<TPasswordForm>({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const updatePassword = (values: TPasswordForm) => {
    transform(() => values);
    put(route(ROUTES.ADMIN.SETTINGS.PASSWORD.UPDATE), {
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

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(updatePassword)}>
              <TextField
                autoComplete="current-password"
                control={form.control}
                disabled={processing}
                label="Current Password"
                name="current_password"
                placeholder="Current password"
                type="password"
              />

              <TextField
                autoComplete="new-password"
                control={form.control}
                disabled={processing}
                label="New Password"
                name="password"
                placeholder="New password"
                type="password"
              />

              <TextField
                autoComplete="new-password"
                control={form.control}
                disabled={processing}
                label="Confirm Password"
                name="password_confirmation"
                placeholder="Confirm password"
                type="password"
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
          </Form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
