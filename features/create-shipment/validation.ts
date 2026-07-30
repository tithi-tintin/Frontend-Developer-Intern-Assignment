import { requiredShipmentFields } from "./constants";
import type { ShipmentFormErrors, ShipmentFormFields } from "./types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateShipmentForm(fields: ShipmentFormFields): ShipmentFormErrors {
  const errors: ShipmentFormErrors = {};

  requiredShipmentFields.forEach((field) => {
    if (fields[field].trim()) return;

    if (field === "deliveryAddress") errors[field] = "Address is required.";
    else if (field === "shippingMethod") errors[field] = "Shipping method is required.";
    else errors[field] = "This field is required.";
  });

  if (fields.senderEmail && !emailPattern.test(fields.senderEmail)) {
    errors.senderEmail = "Enter a valid email address.";
  }

  if (fields.recipientEmail && !emailPattern.test(fields.recipientEmail)) {
    errors.recipientEmail = "Enter a valid email address.";
  }

  return errors;
}
