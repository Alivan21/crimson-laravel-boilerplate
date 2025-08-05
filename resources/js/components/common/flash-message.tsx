import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

type FlashMessages = {
  success?: string;
  error?: string;
};

export default function FlashMessage() {
  const { flash } = usePage<{ flash: FlashMessages }>().props;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }

    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  return null;
}
