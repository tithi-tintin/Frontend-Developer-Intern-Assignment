export type ShipmentStatus =
  | "Delivery"
  | "Completed"
  | "Pending"
  | "In Transit"
  | "Out for Delivery"
  | "Processing"
  | "Delivered";

export type Shipment = {
  id: string;
  company: string;
  category: string;
  productCategory: string;
  carrier: string;
  vehicle: string;
  origin: string;
  destination: string;
  issueDate: string;
  arrivalDate: string;
  weight: string;
  progress: number;
  status: ShipmentStatus;
  accent: string;
};

export type InvoiceLine = {
  description: string;
  shipmentType: string;
  price: number;
  quantity: number;
};

export type Invoice = {
  id: string;
  company: string;
  shippingId: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue" | "Pending";
  email: string;
  address: string;
  phone: string;
  lines: InvoiceLine[];
  taxRate: number;
  fee: number;
};
