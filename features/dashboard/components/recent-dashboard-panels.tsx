"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { Panel, Search, StatusBadge } from "@/components/ui";
import { dashboardRecentShipments, recentActivities } from "@/data/dashboard";

function ActivityCopy({ text }: { text: string }) {
  return (
    <p>
      {text.split(/(@[\w]+)/g).map((part) =>
        part.startsWith("@") ? <a key={part}>{part}</a> : part,
      )}
    </p>
  );
}

export function RecentDashboardPanels() {
  const [search, setSearch] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const shipments = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = dashboardRecentShipments.filter((shipment) =>
      [
        shipment.id,
        shipment.company,
        shipment.category,
        shipment.carrier,
        shipment.origin,
        shipment.destination,
        shipment.status,
      ].join(" ").toLowerCase().includes(query),
    );
    return newestFirst ? filtered : [...filtered].reverse();
  }, [newestFirst, search]);

  const allVisibleSelected =
    shipments.length > 0 && shipments.every((shipment) => selected.has(shipment.id));

  function toggleShipment(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllVisible() {
    setSelected((current) => {
      const next = new Set(current);
      if (allVisibleSelected) shipments.forEach((shipment) => next.delete(shipment.id));
      else shipments.forEach((shipment) => next.add(shipment.id));
      return next;
    });
  }

  return (
    <div className="dashboard-bottom-row">
      <Panel
        title="Recent Shipments"
        action={(
          <div className="recent-toolbar">
            <Search value={search} onChange={setSearch} placeholder="Search shipment" />
            <button
              className={`compact-icon-button ${newestFirst ? "active" : ""}`}
              aria-label={newestFirst ? "Show shipments in reverse order" : "Show newest shipments first"}
              onClick={() => setNewestFirst((current) => !current)}
            >
              <Icon name="filter" />
            </button>
            <button className="more-button" aria-label="More recent shipment options">•••</button>
          </div>
        )}
        className="recent-shipments-panel"
      >
        <div className="compact-table-wrap">
          <table className="compact-table">
            <thead>
              <tr>
                <th className="select-cell">
                  <input
                    type="checkbox"
                    aria-label="Select all visible shipments"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                  />
                </th>
                {["Shipment ID", "Company", "Carriers", "Route", "Shipping Date", "Status"].map((heading) => (
                  <th key={heading}>{heading}<span className="sort-glyph" aria-hidden="true">◇</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td className="select-cell">
                    <input
                      type="checkbox"
                      aria-label={`Select shipment ${shipment.id}`}
                      checked={selected.has(shipment.id)}
                      onChange={() => toggleShipment(shipment.id)}
                    />
                  </td>
                  <td><a>#{shipment.id}</a></td>
                  <td className="dashboard-company-cell">
                    <strong>{shipment.company}</strong>
                    <small>{shipment.category}</small>
                  </td>
                  <td>{shipment.carrier}</td>
                  <td>{shipment.origin} → {shipment.destination}</td>
                  <td>{shipment.issueDate.split(" - ")[0]}</td>
                  <td><StatusBadge status={shipment.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel
        title="Recent Activity"
        action={<button className="more-button" aria-label="More recent activity options">•••</button>}
        className="activity-panel"
      >
        <div className="timeline">
          {recentActivities.map(([symbol, activity, time]) => (
            <div key={activity}>
              <i>{symbol}</i>
              <span><ActivityCopy text={activity} /><small>{time}</small></span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
