"use client";

import { Footer, PageHeader } from "@/components/layout";
import { Icon } from "@/components/icons";
import { Button, EmptyState } from "@/components/ui";
import { ShipmentCard } from "@/features/shipments/components/shipment-card";
import { ShipmentMetrics } from "@/features/shipments/components/shipment-metrics";
import { ShipmentPagination } from "@/features/shipments/components/shipment-pagination";
import { ShipmentTable } from "@/features/shipments/components/shipment-table";
import { ShipmentToolbar } from "@/features/shipments/components/shipment-toolbar";
import { ShipmentViewSwitcher } from "@/features/shipments/components/shipment-view-switcher";
import { useShipments } from "@/features/shipments/hooks/use-shipments";

export default function ShipmentsScreen({ navigate }: { navigate: (path: string) => void }) {
  const shipments = useShipments();

  return (
    <div className="page shipments-page">
      <PageHeader
        title="Shipments"
        breadcrumb="Dashboard / Shipments"
        action={<Button onClick={() => navigate("/shipments/new")}><Icon name="plus" /> New Shipment</Button>}
      >
        <ShipmentViewSwitcher view={shipments.view} onChange={shipments.changeView} />
      </PageHeader>

      {shipments.view === "table" && <ShipmentMetrics />}

      <section className={`shipments-content ${shipments.view}`}>
        <ShipmentToolbar
          view={shipments.view}
          status={shipments.status}
          search={shipments.search}
          dateRange={shipments.dateRange}
          sortKey={shipments.sortKey}
          filterOpen={shipments.filterOpen}
          activeFilterCount={shipments.activeFilterCount}
          draftFilters={shipments.draftFilters}
          onStatusChange={shipments.changeStatus}
          onSearchChange={shipments.changeSearch}
          onDateRangeChange={shipments.changeDateRange}
          onSortChange={shipments.selectSortKey}
          onFilterToggle={shipments.toggleFilterPanel}
          onFilterClose={shipments.closeFilterPanel}
          onDraftFilterChange={shipments.updateDraftFilter}
          onFilterApply={shipments.applyFilters}
          onFilterReset={shipments.resetFilters}
        />

        {shipments.visibleShipments.length === 0 ? (
          <EmptyState message="Try a different status or search term." />
        ) : shipments.view === "table" ? (
          <ShipmentTable
            shipments={shipments.visibleShipments}
            selected={shipments.selected}
            onToggleAll={shipments.toggleVisibleShipments}
            onToggleShipment={shipments.toggleShipment}
            onSort={shipments.changeSort}
          />
        ) : (
          <div className="shipment-card-grid">
            {shipments.visibleShipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        )}
        <ShipmentPagination
          page={shipments.currentPage}
          totalPages={shipments.totalPages}
          pageSize={shipments.effectivePageSize}
          resultCount={shipments.displayResultCount}
          onPageChange={shipments.setPage}
          onPageSizeChange={shipments.changePageSize}
        />
      </section>
      <Footer />
    </div>
  );
}
