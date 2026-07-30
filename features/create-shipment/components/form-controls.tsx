import type { ShipmentFormFields } from "../types";

type FieldProps<K extends keyof ShipmentFormFields> = {
  label: string;
  name: K;
  value: string;
  error?: string;
  onChange: (name: K, value: string) => void;
  placeholder?: string;
  type?: string;
  wide?: boolean;
  prefix?: string;
};

export function Field<K extends keyof ShipmentFormFields>({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  prefix,
}: FieldProps<K>) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <span className={prefix ? "prefixed-input" : ""}>
        {prefix && <b>{prefix}</b>}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(name, event.target.value)}
          className={error ? "invalid" : ""}
          aria-invalid={Boolean(error)}
        />
      </span>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export function PhoneField<K extends keyof ShipmentFormFields>(
  props: Pick<FieldProps<K>, "label" | "name" | "value" | "error" | "onChange">,
) {
  return (
    <label className="form-field">
      <span>{props.label}</span>
      <span className="phone-input">
        <button type="button" className="country-code" aria-label="Country code: United States, plus one">
          <i className="us-flag" aria-hidden="true" />
          <span>+1</span>
          <span aria-hidden="true">⌄</span>
        </button>
        <input
          type="tel"
          value={props.value}
          onChange={(event) => props.onChange(props.name, event.target.value)}
          className={props.error ? "invalid" : ""}
          aria-invalid={Boolean(props.error)}
        />
      </span>
      {props.error && <small className="field-error">{props.error}</small>}
    </label>
  );
}

export function Dimension<K extends keyof ShipmentFormFields>(
  props: Pick<FieldProps<K>, "label" | "name" | "value" | "error" | "onChange" | "placeholder">,
) {
  return (
    <label className="dimension">
      <span>
        <input
          type="number"
          value={props.value}
          placeholder={props.placeholder}
          onChange={(event) => props.onChange(props.name, event.target.value)}
          className={props.error ? "invalid" : ""}
          aria-invalid={Boolean(props.error)}
        />
        <b>cm</b>
      </span>
      <small>{props.label}</small>
    </label>
  );
}

export function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="check-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
