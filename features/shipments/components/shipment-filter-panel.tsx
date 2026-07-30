import { Button } from "@/components/ui";
import { shipmentFilterOptions } from "../constants";
import type { ShipmentFilters } from "../types";

type ShipmentFilterPanelProps = {
  filters: ShipmentFilters;
  onChange: (field: keyof ShipmentFilters, value: string) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function ShipmentFilterPanel({
  filters,
  onChange,
  onApply,
  onReset,
  onClose,
}: ShipmentFilterPanelProps) {
  return (
    <div
      id="shipment-filter-panel"
      className="filter-popover"
      role="dialog"
      aria-label="Filter shipments"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <header>
        <strong>Filter Shipments</strong>
        <button type="button" onClick={onClose} aria-label="Close filters">×</button>
      </header>
      <FilterSelect
        label="Carrier"
        value={filters.carrier}
        options={shipmentFilterOptions.carrier}
        onChange={(value) => onChange("carrier", value)}
      />
      <FilterSelect
        label="Category"
        value={filters.category}
        options={shipmentFilterOptions.category}
        onChange={(value) => onChange("category", value)}
      />
      <FilterSelect
        label="Shipping Service"
        value={filters.service}
        options={shipmentFilterOptions.service}
        onChange={(value) => onChange("service", value)}
      />
      <footer>
        <Button type="button" variant="secondary" onClick={onReset}>Reset</Button>
        <Button type="button" onClick={onApply}>Apply Filters</Button>
      </footer>
    </div>
  );
}
