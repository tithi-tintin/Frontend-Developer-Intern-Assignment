import { ShipmentTypeChart } from "@/components/charts";
import { Panel } from "@/components/ui";
import { shipmentTypeBreakdown } from "@/data/dashboard";

export function ShipmentTypeCard() {
  return (
    <Panel
      title="Shipment Type"
      action={<button className="more-button" aria-label="More shipment type options">•••</button>}
      className="shipment-type-panel"
    >
      <ShipmentTypeChart data={shipmentTypeBreakdown} />
    </Panel>
  );
}
