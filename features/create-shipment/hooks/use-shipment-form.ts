"use client";

import { FormEvent, useState } from "react";
import {
  initialAdditionalServices,
  initialShipmentErrors,
  initialShipmentFields,
} from "../constants";
import type {
  AdditionalServices,
  ShipmentFormErrors,
  ShipmentFormFields,
} from "../types";
import { validateShipmentForm } from "../validation";

export function useShipmentForm() {
  const [fields, setFields] = useState<ShipmentFormFields>(initialShipmentFields);
  const [errors, setErrors] = useState<ShipmentFormErrors>(initialShipmentErrors);
  const [services, setServices] = useState<AdditionalServices>(initialAdditionalServices);
  const [success, setSuccess] = useState("");

  function updateField<K extends keyof ShipmentFormFields>(
    field: K,
    value: ShipmentFormFields[K],
  ) {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    setSuccess("");
  }

  function updateService<K extends keyof AdditionalServices>(
    service: K,
    checked: AdditionalServices[K],
  ) {
    setServices((current) => ({ ...current, [service]: checked }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateShipmentForm(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSuccess("Shipment #SH9583742 was created successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }

  function reset() {
    setFields(initialShipmentFields);
    setErrors(initialShipmentErrors);
    setServices(initialAdditionalServices);
    setSuccess("");
  }

  return {
    fields,
    errors,
    services,
    success,
    updateField,
    updateService,
    submit,
    reset,
  };
}
