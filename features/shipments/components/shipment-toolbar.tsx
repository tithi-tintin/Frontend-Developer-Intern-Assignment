import { Icon } from "@/components/icons";
import { Button, Search, Tabs } from "@/components/ui";
import { gridStatusTabs, tableStatusTabs } from "../constants";
import type {
  ShipmentDateRange,
  ShipmentFilters,
  ShipmentSortKey,
  ViewMode,
} from "../types";
import { ShipmentFilterPanel } from "./shipment-filter-panel";

type ShipmentToolbarProps = {
  view: ViewMode;
  status: string;
  search: string;
  dateRange: ShipmentDateRange;
  sortKey: ShipmentSortKey;
  filterOpen: boolean;
  activeFilterCount: number;
  draftFilters: ShipmentFilters;
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
  onDateRangeChange: (range: ShipmentDateRange) => void;
  onSortChange: (sortKey: ShipmentSortKey) => void;
  onFilterToggle: () => void;
  onFilterClose: () => void;
  onDraftFilterChange: (field: keyof ShipmentFilters, value: string) => void;
  onFilterApply: () => void;
  onFilterReset: () => void;
};

export function ShipmentToolbar({
  view,
  status,
  search,
  dateRange,
  sortKey,
  filterOpen,
  activeFilterCount,
  draftFilters,
  onStatusChange,
  onSearchChange,
  onDateRangeChange,
  onSortChange,
  onFilterToggle,
  onFilterClose,
  onDraftFilterChange,
  onFilterApply,
  onFilterReset,
}: ShipmentToolbarProps) {
  return (
    <div className="shipment-toolbar">
      <Tabs
        items={view === "table" ? tableStatusTabs : gridStatusTabs}
        active={status}
        onChange={onStatusChange}
        ariaLabel="Shipment status"
      />
      <div className="toolbar-actions">
        <Search
          value={search}
          onChange={onSearchChange}
          placeholder={view === "table" ? "Search id, company, etc" : "Search Shipment"}
        />
        <div className="filter-control">
          <Button
            variant="secondary"
            className={`filter-button ${activeFilterCount ? "active" : ""}`}
            onClick={onFilterToggle}
            aria-expanded={filterOpen}
            aria-controls="shipment-filter-panel"
          >
            <Icon name="filter" />
            <span>Filter</span>
            {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
            <Icon name="chevron" />
          </Button>
          {filterOpen && (
            <ShipmentFilterPanel
              filters={draftFilters}
              onChange={onDraftFilterChange}
              onApply={onFilterApply}
              onReset={onFilterReset}
              onClose={onFilterClose}
            />
          )}
        </div>
        {view === "table" ? (
          <label className="date-range-select">
            <Icon name="calendar" />
            <span className="sr-only">Shipment date range</span>
            <select
              value={dateRange}
              onChange={(event) => onDateRangeChange(event.target.value as ShipmentDateRange)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
            <Icon name="chevron" />
          </label>
        ) : (
          <label className="sort-select">
            <span>Sort by:</span>
            <select
              value={sortKey}
              onChange={(event) => onSortChange(event.target.value as ShipmentSortKey)}
            >
              <option value="id">Newest</option>
              <option value="company">Company</option>
              <option value="progress">Progress</option>
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
