export type TLoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type TResetPasswordForm = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};
