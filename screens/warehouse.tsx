"use client";

import { useMemo, useState } from "react";
import { DonutChart, InventoryBarChart } from "@/components/charts";
import { Icon } from "@/components/icons";
import { Footer, PageHeader } from "@/components/layout";
import { Button, Panel, ProgressBar, Tabs } from "@/components/ui";
import {
  floors,
  inventory,
  packageRecords,
  storageRows,
  warehouseActivities,
} from "@/data/warehouse";

export default function WarehouseScreen() {
  const [freight, setFreight] = useState("Road Freight");
  const [packageStatus, setPackageStatus] = useState("All");
  const [floor, setFloor] = useState<keyof typeof floors>("Floor 1");
  const shownPackages = useMemo(() => packageRecords.filter((record) => packageStatus === "All" || record[2] === packageStatus), [packageStatus]);

  return (
    <div className="page warehouse-page">
      <PageHeader title="Warehouse" breadcrumb="Dashboard / Warehouse">
        <div className="freight-tabs">
          {["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"].map((item) => (
            <button key={item} className={freight === item ? "active" : ""} onClick={() => setFreight(item)}>
              <Icon name={item === "Air Freight" ? "plane" : item === "Rail Freight" ? "warehouse" : item === "Ocean Freight" ? "package" : "truck"} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </PageHeader>
      <div className="warehouse-grid">
        <section className="warehouse-metrics">
          <WarehouseMetric label="Total SKU" value="285" trend="+2.58%" />
          <WarehouseMetric label="Quantity on Hand" value="12,450" unit="units" trend="+4.37%" />
          <WarehouseMetric label="Capacity Usage" value="62.5%" unit="full" trend="+1.54%" />
        </section>
        <Panel title="Warehouse Inventory" action={<button className="more-button">•••</button>} className="inventory-panel">
          <div className="inventory-total"><strong>10,000</strong><span>packages</span></div>
          <InventoryBarChart data={inventory} />
        </Panel>
        <Panel title="Capacity Usage" action={<button className="more-button">•••</button>} className="capacity-panel">
          <DonutChart value={62.5} label="Total Usage" dark />
          <div className="capacity-footer"><span><b>Loaded</b><strong>40 shelves</strong></span><span><b>Empty</b><strong>24 shelves</strong></span></div>
        </Panel>
        <Panel title="Warehouse Storage" action={<div className="storage-actions"><Button variant="secondary">▽ Filter⌄</Button><span>Sort by:</span><select><option>Section</option><option>Floor</option></select></div>} className="storage-panel">
          <div className="storage-table-wrap"><table className="storage-table">
            <thead><tr><th>Floor ↕</th><th>Section ↕</th><th>Category ↕</th><th>Storage Used ↕</th><th>Percentage ↕</th><th>Available Space ↕</th></tr></thead>
            <tbody>{storageRows.map(([floorNumber, section, category, percent, available]) => <tr key={section}><td>{floorNumber}</td><td>{section}</td><td>{category}</td><td><ProgressBar value={Number(percent)} /></td><td>{percent}%</td><td>{available}</td></tr>)}</tbody>
          </table></div>
        </Panel>
        <Panel title="Package Status" action={<button className="more-button">•••</button>} className="package-panel">
          <Tabs items={["All", "Expected", "Received", "Sent"]} active={packageStatus} onChange={setPackageStatus} ariaLabel="Package status" />
          <div className="package-list">{shownPackages.map(([id, time, status]) => <div key={id}><i><Icon name="package" /></i><span><strong>{id}</strong><small>{time}</small></span><b className={`status status-${status.toLowerCase()}`}>{status}</b></div>)}</div>
        </Panel>
        <Panel title="Warehouse Map" action={<Tabs items={["Floor 1", "Floor 2", "Floor 3"]} active={floor} onChange={(item) => setFloor(item as keyof typeof floors)} ariaLabel="Warehouse floor" />} className="warehouse-map-panel">
          <div className="warehouse-map">{floors[floor].map(([name, cells, available]) => (
            <article key={name}><strong>{name}</strong><div>{cells.map((cell, index) => <span className={index % 3 === 0 ? "available" : ""} key={cell}>{cell}</span>)}</div><small>Available Space <b>{available}</b></small></article>
          ))}</div>
          <div className="map-legend"><span><i />Available</span><span><i />Full</span></div>
        </Panel>
        <Panel title="Warehouse Activity Log" action={<button className="more-button">•••</button>} className="warehouse-activity">
          <div className="warehouse-activity-list">{warehouseActivities.map(([symbol, name, text, time]) => <div key={name}><i>{symbol}</i><span><p><a>{name}</a> {text}</p><small>{time}</small></span></div>)}</div>
        </Panel>
      </div>
      <Footer />
    </div>
  );
}

function WarehouseMetric({ label, value, unit, trend }: { label: string; value: string; unit?: string; trend: string }) {
  return <article><small>{label}</small><span><strong>{value}</strong>{unit && <b>{unit}</b>}</span><em>↗ {trend}</em></article>;
}
