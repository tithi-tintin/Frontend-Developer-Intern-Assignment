import type { Shipment } from "@/types";
import type {
  ShipmentDateRange,
  ShipmentFilters,
  ShipmentSortKey,
  SortDirection,
} from "./types";

type FilterAndSortOptions = {
  shipments: Shipment[];
  status: string;
  search: string;
  filters: ShipmentFilters;
  dateRange: ShipmentDateRange;
  sortKey: ShipmentSortKey;
  sortDirection: SortDirection;
};

function matchesStatus(shipment: Shipment, selectedStatus: string) {
  if (selectedStatus === "All") return true;

  if (selectedStatus === "Delivered") {
    return shipment.status === "Delivered" || shipment.status === "Completed";
  }

  return (
    shipment.status === selectedStatus ||
    (selectedStatus === "Delivery" && shipment.status === "Out for Delivery")
  );
}

function matchesSearch(shipment: Shipment, search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  const searchableText = [
    shipment.id,
    shipment.company,
    shipment.carrier,
    shipment.origin,
    shipment.destination,
  ].join(" ");

  return searchableText.toLowerCase().includes(query);
}

function matchesAdvancedFilters(shipment: Shipment, filters: ShipmentFilters) {
  const carrierMatch = filters.carrier === "All" || shipment.carrier === filters.carrier;
  const categoryMatch = filters.category === "All" || shipment.category === filters.category;
  const serviceMatch = filters.service === "All" || shipment.vehicle === filters.service;
  return carrierMatch && categoryMatch && serviceMatch;
}

function matchesDateRange(shipment: Shipment, dateRange: ShipmentDateRange) {
  if (dateRange === "All Time" || dateRange === "This Month") return true;
  const day = Number(shipment.issueDate.match(/Mar (\d+)/)?.[1] ?? 0);
  if (dateRange === "Today") return day === 21;
  return day >= 18 && day <= 24;
}

function comparableValue(shipment: Shipment, sortKey: ShipmentSortKey) {
  if (sortKey === "weight") {
    return Number(shipment.weight.replace(/[^\d.]/g, ""));
  }

  if (sortKey === "issueDate") {
    return Date.parse(shipment.issueDate.replace(" - ", " "));
  }

  return shipment[sortKey];
}

export function filterAndSortShipments({
  shipments,
  status,
  search,
  filters,
  dateRange,
  sortKey,
  sortDirection,
}: FilterAndSortOptions) {
  const filtered = shipments.filter(
      (shipment) =>
        matchesStatus(shipment, status) &&
        matchesSearch(shipment, search) &&
        matchesAdvancedFilters(shipment, filters) &&
        matchesDateRange(shipment, dateRange),
    );

  if (sortDirection === null) return filtered;

  return filtered.sort((first, second) => {
      const left = comparableValue(first, sortKey);
      const right = comparableValue(second, sortKey);
      const result =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right), undefined, { numeric: true });
      return sortDirection === "asc" ? result : -result;
    });
}
