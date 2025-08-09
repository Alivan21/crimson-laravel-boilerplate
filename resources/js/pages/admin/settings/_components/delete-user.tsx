import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/common/routes";
import HeadingSmall from "@/components/common/heading-small";
import Input from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormValidationErrors } from "@/hooks/forms/use-form-validation-error";
import { z } from "zod";

const deleteUserSchema = z.object({ password: z.string().min(1, "Password is required") });

type DeleteUserForm = z.infer<typeof deleteUserSchema>;

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);

  const form = useForm<DeleteUserForm>({
    defaultValues: { password: "" },
    resolver: zodResolver(deleteUserSchema),
  });
  useFormValidationErrors(form);

  const {
    delete: destroy,
    processing,
    reset,
    clearErrors,
    transform,
  } = useInertiaForm<DeleteUserForm>({
    password: "",
  });

  const deleteUser = (values: DeleteUserForm) => {
    transform(() => values);
    destroy(route(ROUTES.ADMIN.SETTINGS.PROFILE.DESTROY), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
  };

  return (
    <div className="space-y-6">
      <HeadingSmall
        description="Delete your account and all of its resources"
        title="Delete account"
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will also be permanently
              deleted. Please enter your password to confirm you would like to permanently delete
              your account.
            </DialogDescription>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(deleteUser)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      const { ref, ...rest } = field;
                      return (
                        <FormItem>
                          <FormLabel className="sr-only">Password</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="current-password"
                              placeholder="Password"
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
                </div>

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button onClick={closeModal} variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button asChild disabled={processing} variant="destructive">
                    <button type="submit">Delete account</button>
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
