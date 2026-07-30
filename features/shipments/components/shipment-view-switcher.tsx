import { Icon } from "@/components/icons";
import type { ViewMode } from "../types";

export function ShipmentViewSwitcher({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}) {
  return (
    <div className="view-switcher" aria-label="Shipment view">
      <button
        className={view === "table" ? "active" : ""}
        onClick={() => onChange("table")}
        aria-label="Table view"
      >
        <Icon name="table" /><span>Table</span>
      </button>
      <button
        className={view === "grid" ? "active" : ""}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
      >
        <Icon name="grid" /><span>Grid</span>
      </button>
    </div>
  );
}
