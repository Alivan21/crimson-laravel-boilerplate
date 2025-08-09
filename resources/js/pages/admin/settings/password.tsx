import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/common/routes";
import HeadingSmall from "@/components/common/heading-small";
import Input from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
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

  const form = useForm<TPasswordForm>({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(passwordSchema),
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
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => {
                  const { ref, ...rest } = field;
                  return (
                    <FormItem>
                      <FormLabel required>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="current-password"
                          placeholder="Current password"
                          ref={(el) => {
                            ref(el);
                            currentPasswordInput.current = el as HTMLInputElement | null;
                          }}
                          type="password"
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const { ref, ...rest } = field;
                  return (
                    <FormItem>
                      <FormLabel required>New Password</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="new-password"
                          placeholder="New password"
                          ref={(el) => {
                            ref(el);
                            passwordInput.current = el as HTMLInputElement | null;
                          }}
                          type="password"
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        placeholder="Confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
