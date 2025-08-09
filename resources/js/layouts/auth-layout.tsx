import FlashMessage from "@/components/common/flash-message";
import AuthLayoutTemplate from "@/layouts/auth/auth-simple-layout";
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <AuthLayoutTemplate description={description} title={title} {...props}>
      <Toaster closeButton position="top-center" richColors />
      {children}
      <FlashMessage />
    </AuthLayoutTemplate>
  );
}
