import { Icon } from "@/components/icons";

const shipmentMetrics = [
  { label: "Total Shipments", value: "1,284", change: "4.6%", period: "this week", icon: "truck", direction: "up" },
  { label: "Pending", value: "285", change: "8.7%", period: "this week", icon: "clock", direction: "up" },
  { label: "Delivery", value: "594", change: "4.2%", period: "from last week", icon: "package", direction: "down" },
  { label: "Completed", value: "405", change: "3.9%", period: "this week", icon: "check", direction: "up" },
] as const;

export function ShipmentMetrics() {
  return (
    <div className="shipment-metrics">
      {shipmentMetrics.map((metric) => (
        <article className="shipment-metric-card" key={metric.label}>
          <header>
            <span><Icon name={metric.icon} /></span>
            <small>{metric.label}</small>
            <button aria-label={`More ${metric.label} options`}>•••</button>
          </header>
          <strong>{metric.value}</strong>
          <p className={metric.direction}>
            <i>{metric.direction === "up" ? "⌃" : "⌄"}</i>
            <span>{metric.direction === "up" ? "Up by" : "Down"} <b>{metric.change}</b><small>{metric.period}</small></span>
          </p>
        </article>
      ))}
    </div>
  );
}
