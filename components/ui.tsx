"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./icons";

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {(title || action) && (
        <header className="panel-head">
          {typeof title === "string" ? <h2>{title}</h2> : title}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "icon";
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Search({
  value,
  onChange,
  placeholder = "Search anything",
  label = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}) {
  return (
    <label className="search">
      <span className="sr-only">{label}</span>
      <Icon name="search" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}

export function Tabs({
  items,
  active,
  onChange,
  ariaLabel = "View filters",
}: {
  items: string[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}) {
  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item}
          role="tab"
          aria-selected={active === item}
          className={active === item ? "active" : ""}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={`status status-${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>;
}

export function MetricCard({
  label,
  value,
  trend,
  icon,
  direction = "up",
}: {
  label: string;
  value: string;
  trend: string;
  icon: string;
  direction?: "up" | "down";
}) {
  return (
    <article className="metric-card">
      <span className="metric-icon"><Icon name={icon} /></span>
      <div className="metric-copy">
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
      <small className={direction === "up" ? "positive" : "negative"}>
        {direction === "up" ? "↗" : "↘"} {trend}
      </small>
    </article>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <span className="progress" aria-label={`${value}% complete`}>
      <i style={{ width: `${value}%` }} />
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="empty-state">
      <Icon name="package" />
      <strong>No matching records</strong>
      <p>{message}</p>
    </div>
  );
}
