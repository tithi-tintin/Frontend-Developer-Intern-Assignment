import type { ReactNode } from "react";

const iconArtwork: Record<string, ReactNode> = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </>
  ),
  analytics: (
    <>
      <rect x="3.25" y="3.5" width="17.5" height="17" rx="2.2" />
      <path d="M7.5 16.5v-3.4M12 16.5V8M16.5 16.5v-5.7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
      <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.2h17" />
      <path d="M7.3 12.7h.1M11.95 12.7h.1M16.6 12.7h.1M7.3 16.6h.1M11.95 16.6h.1" strokeWidth="2.2" />
    </>
  ),
  shipments: (
    <>
      <path d="M3.5 6h10.7v10.2H3.5zM14.2 9h3.4l2.9 3.4v3.8h-6.3z" />
      <circle cx="7" cy="17.8" r="1.7" />
      <circle cx="17.6" cy="17.8" r="1.7" />
      <path d="M15.8 10.8h1.2l1.5 1.8h-2.7z" />
    </>
  ),
  tracking: (
    <>
      <circle cx="5.2" cy="17.8" r="2.2" />
      <circle cx="18.8" cy="6.2" r="2.2" />
      <path d="M7.2 16.8c1.6-.7 2.1-2 2.1-3.6 0-2.4 1.4-3.7 3.6-3.7 1.8 0 3.1-.7 4.1-1.8" strokeDasharray="2.2 2.2" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3.2 20.2V8.8L12 3.5l8.8 5.3v11.4M7.2 20.2v-8.4h9.6v8.4M7.2 15.2h9.6M9.4 11.8v8.4M14.6 11.8v8.4" />
    </>
  ),
  fleets: (
    <>
      <rect x="3.5" y="5" width="17" height="13.5" rx="2.2" />
      <path d="M6.5 8.2h11M7.2 18.5v2M16.8 18.5v2M6.2 14.8h.1M17.7 14.8h.1" strokeWidth="2.1" />
    </>
  ),
  drivers: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" />
      <circle cx="8.6" cy="10" r="2.1" />
      <path d="M5.8 16c.7-1.7 1.6-2.6 2.8-2.6 1.3 0 2.2.9 2.9 2.6M14.2 9h3.1M14.2 13h3.1" />
    </>
  ),
  invoices: (
    <>
      <path d="M5 3.5h14v17l-2.4-1.5-2.3 1.5-2.3-1.5-2.3 1.5L7.4 19 5 20.5z" />
      <path d="M8.3 8h7.4M8.3 11.7h7.4M8.3 15.4h4.7" />
    </>
  ),
  message: (
    <>
      <path d="M4 5.2h16v11.1H9l-5 4.2z" />
      <path d="M8 9.2h8M8 12.6h5.5" />
    </>
  ),
  notification: (
    <>
      <path d="M6.3 17.2h11.4l-1.5-2.1v-4.5a4.2 4.2 0 0 0-8.4 0v4.5z" />
      <path d="M10 19.2a2.2 2.2 0 0 0 4 0M12 4.2V2.8" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M9.5 3.7 10 2h4l.5 1.7 1.6.9 1.7-.4 2 3.4-1.2 1.3v1.9l1.2 1.2-2 3.5-1.7-.4-1.6.9-.5 1.7h-4L9.5 16l-1.6-.9-1.7.4-2-3.5 1.2-1.2V8.9L4.2 7.6l2-3.4 1.7.4z" transform="translate(0 1.15) scale(1 .9)" />
    </>
  ),
  search: <><circle cx="10.6" cy="10.6" r="6.3" /><path d="m15.2 15.2 5 5" /></>,
  filter: <path d="M3.5 5h17l-6.3 7v5.3l-4.4 2.2V12z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  eye: <><path d="M2.8 12s3.2-5.2 9.2-5.2 9.2 5.2 9.2 5.2-3.2 5.2-9.2 5.2S2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
  eyeOff: <><path d="M4 4 20 20M9.5 7.1c.8-.2 1.6-.3 2.5-.3 6 0 9.2 5.2 9.2 5.2a15 15 0 0 1-2.4 2.8M14.6 16.8c-.8.3-1.7.4-2.6.4-6 0-9.2-5.2-9.2-5.2a15.8 15.8 0 0 1 2.5-2.9" /><path d="M9.8 9.8a3.1 3.1 0 0 0 4.4 4.4" /></>,
  chevron: <path d="m7 9.5 5 5 5-5" />,
  arrowLeft: <path d="m14.8 5-7 7 7 7M8.2 12H21" />,
  table: <><rect x="3.5" y="4" width="17" height="16" rx="1.5" /><path d="M3.5 9h17M9 9v11M15 9v11" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" /></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  package: <><path d="m4 7.3 8-4.1 8 4.1v9.4l-8 4.1-8-4.1z" /><path d="m4 7.3 8 4.2 8-4.2M12 11.5v9.3M8 5.2l8 4.2" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.4 2" /></>,
  truck: <><path d="M3.5 6h10.7v10.2H3.5zM14.2 9h3.4l2.9 3.4v3.8h-6.3z" /><circle cx="7" cy="17.8" r="1.7" /><circle cx="17.6" cy="17.8" r="1.7" /></>,
  check: <path d="m5 12.5 4.2 4.2L19.5 6.5" />,
  location: <><path d="M12 21s6-6.1 6-11a6 6 0 1 0-12 0c0 4.9 6 11 6 11Z" /><circle cx="12" cy="10" r="2.1" /></>,
  plane: <path d="m3 13 7.4 1.2L8.2 20l2.4 1 4.2-6 5.6 1.1 1.4-1.4-5.2-2.8.1-6.9-2.4-1-2.5 6.1-7.4-1.3z" />,
};

export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={`icon ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {iconArtwork[name] ?? <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />}
      </svg>
    </span>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`} aria-label="ShipNow">
      <span className="brand-mark">
        <i />
        <i />
      </span>
      {!compact && <strong>SHIPNOW</strong>}
    </span>
  );
}
