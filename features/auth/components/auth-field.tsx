import type { ChangeEvent, ReactNode } from "react";

type AuthFieldProps = {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  error?: string;
  errorId: string;
  onChange: (value: string) => void;
  action?: ReactNode;
};

export function AuthField({
  label,
  type,
  value,
  placeholder,
  autoComplete,
  error,
  errorId,
  onChange,
  action,
}: AuthFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  const input = (
    <input
      className={error ? "invalid" : ""}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    />
  );

  return (
    <label>
      <span>{label}</span>
      {action ? <span className="password-field">{input}{action}</span> : input}
      {error && <small id={errorId} className="field-error">{error}</small>}
    </label>
  );
}
