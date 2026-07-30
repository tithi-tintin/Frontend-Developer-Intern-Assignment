"use client";

import { FormEvent, useState } from "react";
import type { AuthErrors, AuthMode, AuthValues } from "../types";
import { validateAuthForm } from "../validation";

const initialValues: AuthValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function useAuthForm(navigate: (path: string) => void) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [values, setValues] = useState<AuthValues>(initialValues);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function updateField<K extends keyof AuthValues>(field: K, value: AuthValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
    setShowPassword(false);
    setValues((current) => ({
      ...initialValues,
      email: current.email,
      fullName: nextMode === "register" ? current.fullName : "",
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAuthForm(mode, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    if (mode === "register") {
      localStorage.setItem(
        "shipnow-account",
        JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
        }),
      );
    }

    localStorage.setItem(
      "shipnow-session",
      JSON.stringify({ email: values.email.trim(), remember }),
    );
    navigate("/dashboard");
  }

  return {
    mode,
    values,
    errors,
    showPassword,
    remember,
    updateField,
    changeMode,
    submit,
    setShowPassword,
    setRemember,
  };
}
