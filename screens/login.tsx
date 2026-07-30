"use client";

import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthShowcase } from "@/features/auth/components/auth-showcase";

export default function LoginScreen({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main className="login-page">
      <AuthShowcase />
      <AuthForm navigate={navigate} />
    </main>
  );
}
