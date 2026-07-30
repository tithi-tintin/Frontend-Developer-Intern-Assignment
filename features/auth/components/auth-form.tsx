"use client";

import { Icon, Logo } from "@/components/icons";
import { Button } from "@/components/ui";
import { useAuthForm } from "../hooks/use-auth-form";
import { AuthField } from "./auth-field";

export function AuthForm({ navigate }: { navigate: (path: string) => void }) {
  const form = useAuthForm(navigate);
  const isLogin = form.mode === "login";
  const passwordType = form.showPassword ? "text" : "password";

  const passwordToggle = (
    <button
      type="button"
      onClick={() => form.setShowPassword((value) => !value)}
      aria-label={form.showPassword ? "Hide password" : "Show password"}
    >
      <Icon name={form.showPassword ? "eyeOff" : "eye"} />
    </button>
  );

  return (
    <section className="login-form-side">
      <form className="login-form" onSubmit={form.submit} noValidate>
        <Logo compact />
        <h2>{isLogin ? "Welcome Back" : "Create Your Account"}</h2>
        <p>
          {isLogin
            ? "Log in to continue managing your logistics with ShipNow"
            : "Register to start managing your shipments with ShipNow"}
        </p>

        {!isLogin && (
          <AuthField
            label="Full Name"
            type="text"
            value={form.values.fullName}
            onChange={(value) => form.updateField("fullName", value)}
            placeholder="Enter your full name"
            autoComplete="name"
            error={form.errors.fullName}
            errorId="register-name-error"
          />
        )}

        <AuthField
          label="Email Address"
          type="email"
          value={form.values.email}
          onChange={(value) => form.updateField("email", value)}
          placeholder="Enter a valid email address"
          autoComplete="email"
          error={form.errors.email}
          errorId="login-email-error"
        />

        <AuthField
          label="Password"
          type={passwordType}
          value={form.values.password}
          onChange={(value) => form.updateField("password", value)}
          placeholder="Create a strong password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          error={form.errors.password}
          errorId="login-password-error"
          action={passwordToggle}
        />

        {!isLogin && (
          <AuthField
            label="Confirm Password"
            type={passwordType}
            value={form.values.confirmPassword}
            onChange={(value) => form.updateField("confirmPassword", value)}
            placeholder="Enter your password again"
            autoComplete="new-password"
            error={form.errors.confirmPassword}
            errorId="register-confirm-error"
          />
        )}

        {isLogin && (
          <div className="login-options">
            <label className="check-label">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(event) => form.setRemember(event.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <button type="button" className="link-button">Forgot Password?</button>
          </div>
        )}

        <Button type="submit">{isLogin ? "Login" : "Create Account"}</Button>
        <p className="register-copy">
          {isLogin ? "Don\u2019t have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => form.changeMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </section>
  );
}
