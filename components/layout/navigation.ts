export const navItems = [
  ["dashboard", "Dashboard", "/dashboard"],
  ["analytics", "Analytics", "/analytics"],
  ["calendar", "Calendar", "/calendar"],
  ["shipments", "Shipments", "/shipments"],
  ["tracking", "Tracking", "/tracking"],
  ["warehouse", "Warehouse", "/warehouse"],
  ["fleets", "Fleets", "/fleets"],
  ["drivers", "Drivers", "/drivers"],
  ["invoices", "Invoices & Billing", "/invoices"],
] as const;

export const utilityItems = [
  ["message", "Message", "19"],
  ["notification", "Notification", "5"],
  ["settings", "Settings", ""],
] as const;

export function getPageTitle(route: string) {
  if (route.startsWith("/shipments/new")) return "Create New Shipment";
  if (route.startsWith("/shipments")) return "Shipments";
  if (route.startsWith("/invoices")) return "Invoices & Billing";
  if (route.startsWith("/warehouse")) return "Warehouse";
  if (route.startsWith("/dashboard")) return "Dashboard";
  return route.slice(1).replaceAll("-", " ") || "ShipNow";
}
