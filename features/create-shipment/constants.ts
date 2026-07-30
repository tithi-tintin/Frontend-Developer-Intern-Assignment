import type {
  AdditionalServices,
  ShipmentFormErrors,
  ShipmentFormFields,
} from "./types";

export const initialShipmentFields: ShipmentFormFields = {
  senderCompany: "GreenHaven",
  senderEmail: "logistics@greenhaven.com",
  senderPhone: "408-555-7210",
  pickupAddress: "1120 Birch Street, Portland, OR 97205, USA",
  recipientCompany: "FreshNest",
  recipientEmail: "warehouse@freshnest.com",
  recipientPhone: "786-555-4432",
  deliveryAddress: "",
  description: "Premium Garden Tool Set",
  quantity: "40",
  value: "3200",
  weight: "125",
  unit: "Kg",
  length: "80",
  width: "60",
  height: "",
  freight: "Road Freight",
  carrier: "FedEx",
  shippingMethod: "",
  date: "2035-03-21",
  notes: "",
};

export const initialShipmentErrors: ShipmentFormErrors = {
  deliveryAddress: "Address is required.",
  shippingMethod: "Shipping method is required.",
};

export const initialAdditionalServices: AdditionalServices = {
  insurance: true,
  temperature: true,
  signature: true,
  fragile: false,
  notify: true,
};

export const requiredShipmentFields: (keyof ShipmentFormFields)[] = [
  "senderCompany",
  "senderEmail",
  "senderPhone",
  "pickupAddress",
  "recipientCompany",
  "recipientEmail",
  "recipientPhone",
  "deliveryAddress",
  "description",
  "quantity",
  "value",
  "weight",
  "length",
  "width",
  "height",
  "carrier",
  "shippingMethod",
  "date",
];

export const freightTypes = [
  "Road Freight",
  "Rail Freight",
  "Ocean Freight",
  "Air Freight",
];
