export type AuthMode = "login" | "register";

export type AuthValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthErrors = Partial<Record<keyof AuthValues, string>>;
