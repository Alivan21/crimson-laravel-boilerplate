import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    password_confirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    email: z.email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    password_confirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email().min(1, "Email is required"),
});

export const confirmPasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type TLoginForm = z.infer<typeof loginSchema>;
export type TRegisterForm = z.infer<typeof registerSchema>;
export type TResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type TConfirmPasswordForm = z.infer<typeof confirmPasswordSchema>;
