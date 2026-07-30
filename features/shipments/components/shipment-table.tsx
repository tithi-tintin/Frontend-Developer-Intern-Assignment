import { ProgressBar, StatusBadge } from "@/components/ui";
import type { Shipment } from "@/types";
import type { ShipmentSortKey } from "../types";
import { CompanyMark } from "./company-mark";

function SortButton({
  label,
  field,
  onSort,
}: {
  label: string;
  field: ShipmentSortKey;
  onSort: (key: ShipmentSortKey) => void;
}) {
  return <button className="sort-button" onClick={() => onSort(field)}>{label} ↕</button>;
}

function FreightIcon({ vehicle }: { vehicle: string }) {
  const glyph =
    vehicle === "Air Freight" ? "✈" :
    vehicle === "Ocean Freight" ? "⚓" :
    vehicle === "Rail Freight" ? "▥" :
    "▱";

  return <span className="freight-icon" aria-hidden="true">{glyph}</span>;
}

function DateLine({ value, label, arrival = false }: { value: string; label: string; arrival?: boolean }) {
  const [date, time] = value.split(" - ");
  return (
    <span className={arrival ? "date-line arrival" : "date-line"}>
      <strong>{date} – {time}</strong>
      <small>({label})</small>
    </span>
  );
}

type ShipmentTableProps = {
  shipments: Shipment[];
  selected: Set<string>;
  onToggleAll: () => void;
  onToggleShipment: (shipmentId: string) => void;
  onSort: (key: ShipmentSortKey) => void;
};

export function ShipmentTable({
  shipments,
  selected,
  onToggleAll,
  onToggleShipment,
  onSort,
}: ShipmentTableProps) {
  const allVisibleSelected =
    shipments.length > 0 && shipments.every((shipment) => selected.has(shipment.id));

  return (
    <div className="shipment-table-wrap">
      <table className="shipment-table">
        <colgroup>
          <col className="select-column" />
          <col className="shipping-id-column" />
          <col className="company-column" />
          <col className="carrier-column" />
          <col className="category-column" />
          <col className="weight-column" />
          <col className="route-column" />
          <col className="date-column" />
          <col className="progress-column" />
          <col className="status-column" />
        </colgroup>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={onToggleAll}
                aria-label="Select all visible shipments"
              />
            </th>
            <th><SortButton label="Shipping ID" field="id" onSort={onSort} /></th>
            <th><SortButton label="Company" field="company" onSort={onSort} /></th>
            <th><SortButton label="Carriers" field="carrier" onSort={onSort} /></th>
            <th className="wide-only"><SortButton label="Product Category" field="productCategory" onSort={onSort} /></th>
            <th className="wide-only"><SortButton label="Weight" field="weight" onSort={onSort} /></th>
            <th className="tablet-hide"><SortButton label="Route" field="origin" onSort={onSort} /></th>
            <th className="tablet-hide"><SortButton label="Date" field="issueDate" onSort={onSort} /></th>
            <th className="desktop-only"><SortButton label="Progress" field="progress" onSort={onSort} /></th>
            <th className="desktop-only"><SortButton label="Status" field="status" onSort={onSort} /></th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className={selected.has(shipment.id) ? "selected" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.has(shipment.id)}
                  onChange={() => onToggleShipment(shipment.id)}
                  aria-label={`Select ${shipment.id}`}
                />
              </td>
              <td className="shipping-id-cell">
                <a>#{shipment.id}</a>
                <small><FreightIcon vehicle={shipment.vehicle} />{shipment.vehicle}</small>
              </td>
              <td>
                <span className="company-cell">
                  <b className={`company-mark ${shipment.company === "StyleHub Co." || shipment.company === "FitPlus Gear" || shipment.company === "EcoLights" || shipment.company === "ModaWear" || shipment.company === "VitaFresh" ? "violet" : ""}`}>
                    <CompanyMark company={shipment.company} />
                  </b>
                  <span><strong>{shipment.company}</strong><small>{shipment.category}</small></span>
                </span>
              </td>
              <td>{shipment.carrier}</td>
              <td className="wide-only">{shipment.productCategory}</td>
              <td className="wide-only">{shipment.weight}</td>
              <td className="tablet-hide route-cell">
                <span><strong>{shipment.origin}</strong><small>(Origin)</small></span>
                <span><strong>{shipment.destination}</strong><small>(Destination)</small></span>
              </td>
              <td className="tablet-hide date-cell">
                <DateLine value={shipment.issueDate} label="ATD" />
                <DateLine value={shipment.arrivalDate} label="ETA" arrival />
              </td>
              <td className="desktop-only">
                <span className="progress-cell">
                  <ProgressBar value={shipment.progress} />{shipment.progress}%
                </span>
              </td>
              <td className="desktop-only"><StatusBadge status={shipment.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
