import { z } from "zod";

export const profileSchema = z.object({
  email: z.email().min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),
});

export const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(1, "Password is required"),
    password_confirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type TProfileForm = z.infer<typeof profileSchema>;

export type TPasswordForm = z.infer<typeof passwordSchema>;
