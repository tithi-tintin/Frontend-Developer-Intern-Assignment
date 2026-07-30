import { shipments } from "@/data/shipments";
import type { ShipmentFilters } from "./types";

export const emptyShipmentFilters: ShipmentFilters = {
  carrier: "All",
  category: "All",
  service: "All",
};

function uniqueOptions(values: string[]) {
  return ["All", ...Array.from(new Set(values)).sort()];
}

export const shipmentFilterOptions = {
  carrier: uniqueOptions(shipments.map((shipment) => shipment.carrier)),
  category: uniqueOptions(shipments.map((shipment) => shipment.category)),
  service: uniqueOptions(shipments.map((shipment) => shipment.vehicle)),
};

export const tableStatusTabs = ["All", "Completed", "Delivery", "Pending"];

export const gridStatusTabs = [
  "All",
  "Delivered",
  "In Transit",
  "Processing",
  "Out for Delivery",
];
