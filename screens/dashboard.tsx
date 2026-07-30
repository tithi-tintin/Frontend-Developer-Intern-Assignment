"use client";

import { useState } from "react";
import { BarChart, RouteMap, StepChart } from "@/components/charts";
import { Footer } from "@/components/layout";
import { Icon } from "@/components/icons";
import { Button, MetricCard, Panel, Search } from "@/components/ui";
import {
  productCategories,
  profitSummary,
  shipmentAlerts,
  shipmentStatistics,
} from "@/data/dashboard";
import { RecentDashboardPanels } from "@/features/dashboard/components/recent-dashboard-panels";
import { ShipmentTypeCard } from "@/features/dashboard/components/shipment-type-card";

export default function DashboardScreen({ navigate }: { navigate: (path: string) => void }) {
  const [search, setSearch] = useState("");

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div><small>Hello John!</small><h1>Good Morning</h1></div>
        <Search value={search} onChange={setSearch} />
        <Button onClick={() => navigate("/shipments/new")}><Icon name="plus" /> Add New Shipping</Button>
      </header>
      <div className="dashboard-grid">
        <div className="dashboard-metrics">
          <MetricCard label="Active Shipments" value="1,284" trend="9.7% from last week" icon="truck" />
          <MetricCard label="Delivery Performance" value="94.3%" trend="1.24% from last week" icon="calendar" />
          <MetricCard label="Revenue" value="$82,450" trend="12.4% from last week" icon="clock" />
        </div>
        <ShipmentTypeCard />
        <Panel
          title={<div><h2>Shipment Statistic</h2><strong className="panel-value">4,352 <small>↗ 8.7%</small></strong></div>}
          action={<select aria-label="Shipment statistic period"><option>Last Year</option></select>}
          className="shipment-stat-panel"
        >
          <StepChart data={shipmentStatistics} />
          <div className="chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
        </Panel>
        <Panel
          title={<div><h2>Profit Summary</h2><strong className="panel-value">$624,550 <small>↗ 5.62%</small></strong></div>}
          action={<select aria-label="Profit period"><option>Last 8 Months</option></select>}
          className="profit-panel"
        >
          <div className="profit-legend"><span>● Revenue</span><span>● Cost</span></div>
          <BarChart
            values={profitSummary.map((item) => item.revenue)}
            grouped={profitSummary.map((item) => item.cost)}
            labels={profitSummary.map((item) => item.month)}
          />
        </Panel>
        <Panel title="Product Categories" action={<button className="more-button">•••</button>} className="categories-panel">
          <div className="category-total"><span>Total Products</span><strong>1,000</strong></div>
          <div className="category-stack">{productCategories.map(([name, , percent]) => <i key={name} style={{ width: `${percent}%` }} />)}</div>
          <div className="category-list">
            {productCategories.map(([name, count, percent], index) => (
              <div key={name}><span><i className={`dot dot-${index}`} />{name}</span><b>{count} products</b><strong>{percent}%</strong></div>
            ))}
          </div>
        </Panel>
        <Panel className="tracking-panel"><RouteMap /></Panel>
        <Panel title="Shipment Alerts" action={<button className="more-button">•••</button>} className="alerts-panel">
          <div className="alerts-title"><strong>12</strong> Delays Detected</div>
          <div className="alert-summary">
            <span><b>5</b>Customs Clearance Delay</span>
            <span><b>4</b>Incorrect Address Provided</span>
            <span><b>3</b>Weather-Related Hold</span>
          </div>
          <div className="alerts-list">
            {shipmentAlerts.map(([title, detail]) => <button key={detail}><Icon name="package" /><span><strong>{title}</strong><small>{detail}</small></span><b>↗</b></button>)}
          </div>
        </Panel>
        <RecentDashboardPanels />
      </div>
      <Footer />
    </div>
  );
}
