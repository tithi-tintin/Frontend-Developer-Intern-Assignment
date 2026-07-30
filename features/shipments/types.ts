export type ViewMode = "table" | "grid";

export type ShipmentSortKey =
  | "id"
  | "company"
  | "carrier"
  | "productCategory"
  | "weight"
  | "origin"
  | "issueDate"
  | "progress"
  | "status";

export type SortDirection = "asc" | "desc" | null;

export type ShipmentDateRange = "Today" | "This Week" | "This Month" | "All Time";

export type ShipmentFilters = {
  carrier: string;
  category: string;
  service: string;
};
