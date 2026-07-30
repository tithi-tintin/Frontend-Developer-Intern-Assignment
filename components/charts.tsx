"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const purple = "#8068f2";
const charcoal = "#292929";

export function DonutChart({
  value,
  label,
  dark = false,
}: {
  value: number;
  label: string;
  dark?: boolean;
}) {
  const data = [
    { name: label, value },
    { name: "Available", value: 100 - value },
  ];

  return (
    <div className={`donut-wrap ${dark ? "dark" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="88%"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={purple} />
            <Cell fill={dark ? "#ffffff" : "#e1e1e2"} />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <span><small>{label}</small><strong>{value}%</strong></span>
    </div>
  );
}

export function ShipmentTypeChart({
  data,
}: {
  data: ReadonlyArray<{ name: string; value: number; color: string }>;
}) {
  const chartData = data.map((item) => ({ ...item }));
  return (
    <div
      className="shipment-type-donut"
      role="img"
      aria-label="2,500 total shipments split across four shipment types"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="68%"
            outerRadius="91%"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            {chartData.map((item) => <Cell key={item.name} fill={item.color} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <span>
        <small>Total Shipment</small>
        <strong>2,500</strong>
      </span>
    </div>
  );
}

export function BarChart({
  values,
  labels,
  grouped,
}: {
  values: number[];
  labels: string[];
  grouped?: number[];
}) {
  const data = labels.map((label, index) => ({
    label,
    revenue: values[index],
    cost: grouped?.[index],
  }));

  return (
    <div className="bar-chart recharts-bar" role="img" aria-label="Monthly profit summary bar chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} barGap={3} margin={{ top: 10, right: 4, bottom: 0, left: 4 }}>
          <CartesianGrid vertical={false} stroke="#eeeeef" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 9 }} />
          <YAxis hide domain={[0, "dataMax + 10"]} />
          <Tooltip />
          <Bar dataKey="revenue" fill="#ded6ff" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          {grouped && (
            <Bar dataKey="cost" fill={charcoal} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StepChart({
  data,
}: {
  data: ReadonlyArray<{ month: string; shipments: number }>;
}) {
  const chartData = data.map((item) => ({ ...item }));
  return (
    <div className="step-chart recharts-step" role="img" aria-label="Shipment statistic trend">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 14, right: 7, bottom: 0, left: 7 }}>
          <CartesianGrid vertical={false} stroke="#e9e9ec" />
          <XAxis dataKey="month" hide />
          <YAxis hide domain={["dataMin - 300", "dataMax + 300"]} />
          <Tooltip />
          <Line
            type="stepAfter"
            dataKey="shipments"
            stroke={charcoal}
            strokeWidth={3}
            dot={{ r: 3, fill: purple, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: purple, stroke: "#fff", strokeWidth: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InventoryBarChart({
  data,
}: {
  data: Array<{ name: string; value: number; percent: number; tone: string }>;
}) {
  const colors: Record<string, string> = {
    purple,
    "stripe-purple": "#a895ff",
    dark: charcoal,
    "stripe-dark": "#59595c",
    gray: "#747474",
    "stripe-gray": "#a4a4a7",
  };

  return (
    <div className="inventory-chart" role="img" aria-label="Warehouse inventory by product category">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 12, right: 4, bottom: 8, left: 4 }}>
          <CartesianGrid vertical={false} stroke="#eeeeef" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={43}
            tick={{ fill: "#777", fontSize: 8 }}
          />
          <YAxis hide domain={[0, "dataMax + 500"]} />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((item) => (
              <Cell key={item.name} fill={colors[item.tone] ?? purple} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RouteMap() {
  return (
    <div className="route-map" aria-label="Live shipment route from San Francisco to New York">
      <label className="map-search">Search by Shipping ID... <span>⌕</span></label>
      <div className="map-controls"><button aria-label="Zoom in">+</button><button aria-label="Zoom out">−</button></div>
      <svg viewBox="0 0 700 250" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 150 C120 100 210 120 300 95 S500 70 700 45" className="map-path-base" />
        <path d="M300 95 C400 75 520 65 700 45" className="map-path-active" />
        <circle cx="300" cy="95" r="10" />
        <path d="M294 91 L309 95 L294 101 Z" className="map-plane" />
      </svg>
      <div className="tracking-card">
        <div><strong>#SH8743921</strong><small>In Transit · On Schedule</small></div>
        <span><strong>Driver</strong><small>Daniel Cooper</small></span>
        <div className="tracking-progress"><i /><b /></div>
        <footer>
          <span><strong>San Francisco, CA, USA</strong><small>Mar 19, 2035 - 10:30 AM</small></span>
          <span><strong>New York, NY, USA</strong><small>Mar 21, 2035 - 03:00 PM</small></span>
        </footer>
      </div>
    </div>
  );
}
