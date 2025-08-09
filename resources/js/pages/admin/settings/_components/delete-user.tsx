import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

import { ROUTES } from "@/common/routes";
import HeadingSmall from "@/components/common/heading-small";
import InputError from "@/components/forms/input-error";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm<Required<{ password: string }>>({ password: "" });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

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
            <form className="space-y-6" onSubmit={deleteUser}>
              <div className="grid gap-2">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>

                <Input
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="Password"
                  ref={passwordInput}
                  type="password"
                  value={data.password}
                />

                <InputError message={errors.password} />
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
