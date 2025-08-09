import { Transition } from "@headlessui/react";
import { Link, useForm as useInertiaForm, usePage } from "@inertiajs/react";

import { ROUTES } from "@/common/routes";
import HeadingSmall from "@/components/common/heading-small";
import { TextField } from "@/components/forms/fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/forms/use-zod-form";
import AppLayout from "@/layouts/app-layout";
import { TProfileForm, profileSchema } from "@/types/modules/admin/settings";
import { ISharedData } from "@/types/shared";
import { IBreadcrumbItem } from "@/types/shared/navigation";
import DeleteUser from "./_components/delete-user";
import SettingsLayout from "./_layout";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    title: "Profile settings",
    href: "/settings/profile",
  },
];

type ProfileProps = {
  must_verify_email: boolean;
  status?: string;
};

export default function Profile({ must_verify_email, status }: ProfileProps) {
  const { auth } = usePage<ISharedData>().props;

  const form = useZodForm<TProfileForm>({
    defaultValues: { email: auth.user.email, name: auth.user.name },
    schema: profileSchema,
  });

  const { patch, processing, recentlySuccessful, transform } = useInertiaForm<TProfileForm>({
    name: auth.user.name,
    email: auth.user.email,
  });

  const handleSubmit = (values: TProfileForm) => {
    transform(() => values);
    patch(route(ROUTES.ADMIN.SETTINGS.PROFILE.UPDATE), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs} showHeader={false} title="Profile settings">
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            description="Update your name and email address"
            title="Profile information"
          />

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <TextField
                autoComplete="name"
                control={form.control}
                disabled={processing}
                label="Name"
                name="name"
                placeholder="Full name"
                type="text"
              />

              <TextField
                autoComplete="username"
                control={form.control}
                disabled={processing}
                label="Email address"
                name="email"
                placeholder="Email address"
                type="email"
              />

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

        <div className="mt-10 space-y-6">
          <HeadingSmall
            description="Once your account is deleted, all of its resources and data will be permanently deleted."
            title="Delete Account"
          />

          <DeleteUser />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
