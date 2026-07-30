export type ShipmentFormFields = {
  senderCompany: string;
  senderEmail: string;
  senderPhone: string;
  pickupAddress: string;
  recipientCompany: string;
  recipientEmail: string;
  recipientPhone: string;
  deliveryAddress: string;
  description: string;
  quantity: string;
  value: string;
  weight: string;
  unit: string;
  length: string;
  width: string;
  height: string;
  freight: string;
  carrier: string;
  shippingMethod: string;
  date: string;
  notes: string;
};

export type ShipmentFormErrors = Partial<Record<keyof ShipmentFormFields, string>>;

export type AdditionalServices = {
  insurance: boolean;
  temperature: boolean;
  signature: boolean;
  fragile: boolean;
  notify: boolean;
};
