import { Icon } from "@/components/icons";
import { ProgressBar, StatusBadge } from "@/components/ui";
import type { Shipment } from "@/types";
import { CompanyMark } from "./company-mark";

function freightIconName(vehicle: string) {
  if (vehicle.includes("Air")) return "plane";
  if (vehicle.includes("Ocean")) return "package";
  if (vehicle.includes("Rail")) return "warehouse";
  return "truck";
}

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <article className="shipment-card">
      <header>
        <span><strong>#{shipment.id}</strong><StatusBadge status={shipment.status} /></span>
        <i><Icon name={freightIconName(shipment.vehicle)} /></i>
      </header>
      <div className="shipment-company">
        <b className={`company-mark ${shipment.company === "StyleHub Co." || shipment.company === "FitPlus Gear" || shipment.company === "EcoLights" || shipment.company === "ModaWear" || shipment.company === "VitaFresh" ? "violet" : ""}`}>
          <CompanyMark company={shipment.company} />
        </b>
        <span><strong>{shipment.company}</strong><small>{shipment.category}</small></span>
      </div>
      <div className="route-box">
        <span><i /><small>Origin</small><strong>{shipment.origin}</strong><time>{shipment.issueDate}</time></span>
        <span><i /><small>Destination</small><strong>{shipment.destination}</strong><time>{shipment.arrivalDate}</time></span>
      </div>
      <footer>
        <span>Progress <b>{shipment.progress}%</b></span>
        <span>Carriers <b>{shipment.carrier}</b></span>
        <ProgressBar value={shipment.progress} />
      </footer>
    </article>
  );
}
