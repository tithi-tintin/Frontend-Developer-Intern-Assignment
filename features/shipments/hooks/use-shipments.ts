"use client";

import { useEffect, useMemo, useState } from "react";
import { gridShipments, shipments } from "@/data/shipments";
import { emptyShipmentFilters } from "../constants";
import type {
  ShipmentFilters,
  ShipmentDateRange,
  ShipmentSortKey,
  SortDirection,
  ViewMode,
} from "../types";
import { filterAndSortShipments } from "../utils";

function viewFromUrl(): ViewMode {
  if (typeof window === "undefined") return "table";
  return new URLSearchParams(window.location.search).get("view") === "grid"
    ? "grid"
    : "table";
}

export function useShipments() {
  const [view, setView] = useState<ViewMode>("table");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<ShipmentDateRange>("This Month");
  const [sortKey, setSortKey] = useState<ShipmentSortKey>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [pageSize, setPageSize] = useState(11);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ShipmentFilters>(emptyShipmentFilters);
  const [draftFilters, setDraftFilters] = useState<ShipmentFilters>(emptyShipmentFilters);
  const sourceShipments = view === "grid" ? gridShipments : shipments;
  const effectivePageSize = view === "grid" ? 12 : pageSize;

  useEffect(() => {
    // The query string is browser-only, so read it after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setView(viewFromUrl());
  }, []);

  const filteredShipments = useMemo(
    () =>
      filterAndSortShipments({
        shipments: sourceShipments,
        status,
        search,
        filters,
        dateRange,
        sortKey,
        sortDirection,
      }),
    [dateRange, filters, search, sortDirection, sortKey, sourceShipments, status],
  );

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / effectivePageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleShipments = filteredShipments.slice(
    (currentPage - 1) * effectivePageSize,
    currentPage * effectivePageSize,
  );
  const activeFilterCount = Object.values(filters).filter((value) => value !== "All").length;

  function changeView(nextView: ViewMode) {
    setView(nextView);
    setStatus("All");
    setSearch("");
    setPageSize(nextView === "grid" ? 12 : 11);
    setPage(1);
    window.history.replaceState({}, "", `/shipments?view=${nextView}`);
  }

  function changeStatus(nextStatus: string) {
    setStatus(nextStatus);
    setPage(1);
  }

  function changeSearch(nextSearch: string) {
    setSearch(nextSearch);
    setPage(1);
  }

  function changeDateRange(nextDateRange: ShipmentDateRange) {
    setDateRange(nextDateRange);
    setPage(1);
  }

  function changeSort(nextSortKey: ShipmentSortKey) {
    if (sortKey === nextSortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextSortKey);
      setSortDirection("asc");
    }
  }

  function selectSortKey(nextSortKey: ShipmentSortKey) {
    setSortKey(nextSortKey);
    setSortDirection("asc");
    setPage(1);
  }

  function toggleFilterPanel() {
    if (!filterOpen) setDraftFilters(filters);
    setFilterOpen((current) => !current);
  }

  function updateDraftFilter(field: keyof ShipmentFilters, value: string) {
    setDraftFilters((current) => ({ ...current, [field]: value }));
  }

  function applyFilters() {
    setFilters(draftFilters);
    setPage(1);
    setFilterOpen(false);
  }

  function resetFilters() {
    setDraftFilters(emptyShipmentFilters);
    setFilters(emptyShipmentFilters);
    setPage(1);
    setFilterOpen(false);
  }

  function toggleShipment(shipmentId: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(shipmentId)) next.delete(shipmentId);
      else next.add(shipmentId);
      return next;
    });
  }

  function toggleVisibleShipments() {
    const allVisibleSelected = visibleShipments.every((shipment) => selected.has(shipment.id));
    setSelected((current) => {
      const next = new Set(current);
      visibleShipments.forEach((shipment) => {
        if (allVisibleSelected) next.delete(shipment.id);
        else next.add(shipment.id);
      });
      return next;
    });
  }

  function changePageSize(nextPageSize: number) {
    setPageSize(nextPageSize);
    setPage(1);
  }

  return {
    view,
    status,
    search,
    dateRange,
    sortKey,
    pageSize,
    effectivePageSize,
    currentPage,
    totalPages,
    selected,
    filterOpen,
    filters,
    draftFilters,
    activeFilterCount,
    filteredShipments,
    displayResultCount:
      status === "All" &&
      search.trim() === "" &&
      dateRange === "This Month" &&
      activeFilterCount === 0
        ? view === "grid" ? 520 : 1240
        : filteredShipments.length,
    visibleShipments,
    changeView,
    changeStatus,
    changeSearch,
    changeDateRange,
    changeSort,
    selectSortKey,
    toggleFilterPanel,
    closeFilterPanel: () => setFilterOpen(false),
    updateDraftFilter,
    applyFilters,
    resetFilters,
    toggleShipment,
    toggleVisibleShipments,
    setPage,
    changePageSize,
  };
}
