import type { ReactNode } from "react";

function MarkSvg({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

export function CompanyMark({ company }: { company: string }) {
  if (company === "TechGear Inc.") {
    return (
      <MarkSvg>
        <path d="M5 8.2 10.2 3h6.1l2.7 4.7-5.2 5.2H7.7Z" fill="currentColor" />
        <path d="m5 16.3 5.2-5.2h6.1l2.7 4.7-5.2 5.2H7.7Z" fill="currentColor" opacity=".76" />
      </MarkSvg>
    );
  }

  if (company === "StyleHub Co.") {
    return (
      <MarkSvg>
        <path d="M12 3 21 17H3Z" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
        <path d="M6.5 17 12 8.2l5.5 8.8" fill="none" stroke="currentColor" strokeWidth="2" />
      </MarkSvg>
    );
  }

  if (company === "FreshNest") {
    return (
      <MarkSvg>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path d="M12 6v12M8 10h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </MarkSvg>
    );
  }

  if (company === "FitPlus Gear") {
    return (
      <MarkSvg>
        <circle cx="12" cy="12" r="8.3" fill="currentColor" />
        <circle cx="12" cy="12" r="4.2" fill="white" />
        <path d="M12 2.5v6M7.8 5l4.2 3.5L16.2 5" fill="white" stroke="white" strokeWidth="1.5" />
      </MarkSvg>
    );
  }

  if (company === "AutoParts Pro") {
    return (
      <MarkSvg>
        <path d="M3 14.5 9.5 6H20l-6.5 8.5Z" fill="currentColor" />
        <path d="m8 19 3-4h8l-3 4Z" fill="#8068f2" />
      </MarkSvg>
    );
  }

  if (company === "EcoLights") {
    return (
      <MarkSvg>
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
        </g>
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </MarkSvg>
    );
  }

  if (company === "GreenHaven") {
    return (
      <MarkSvg>
        <path d="M4 4.5 12 7l8-2.5v7.2c0 4.6-3.3 8-8 9.8-4.7-1.8-8-5.2-8-9.8Z" fill="currentColor" />
        <path d="M7.5 14.5c4.2.2 6.9-2 8.6-6-3.6.1-6.8 1.3-8.6 6Zm1.1-4.2 3.1 2.4" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      </MarkSvg>
    );
  }

  if (company === "ModaWear") {
    return (
      <MarkSvg>
        <path d="M4 7v10M8 7v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16.5" cy="12" r="5.3" fill="none" stroke="currentColor" strokeWidth="3" />
      </MarkSvg>
    );
  }

  if (company === "SunCore Panels") {
    return (
      <MarkSvg>
        {[6, 12, 18].flatMap((x) =>
          [7, 12, 17].map((y) => (
            <rect key={`${x}-${y}`} x={x - 2} y={y - 2} width="4" height="4" rx=".7" fill="currentColor" transform={`rotate(45 ${x} ${y})`} />
          )),
        )}
      </MarkSvg>
    );
  }

  if (company === "VitaFresh") {
    return (
      <MarkSvg>
        <path d="M4 14h4l2.2-5H15l3 5h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="17" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 8h3M6.5 6.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </MarkSvg>
    );
  }

  if (company === "QuickParts") {
    return (
      <MarkSvg>
        <path d="m3 19 6-14h4L7 19Z" fill="#ef5d67" />
        <path d="m9 19 6-14h4l-6 14Z" fill="#8068f2" />
        <path d="m15 19 5-12h2l-5 12Z" fill="#ff7b65" />
      </MarkSvg>
    );
  }

  if (company === "StyleDepot") {
    return (
      <MarkSvg>
        <path d="M3 12 12 3l9 9-9 9Z" fill="currentColor" />
        <g stroke="white" strokeWidth="1">
          <path d="m6 12 6-6M8.5 14.5l6-6M11 17l6-6M13.5 19.5l6-6" />
        </g>
      </MarkSvg>
    );
  }

  return <MarkSvg><circle cx="12" cy="12" r="8" fill="currentColor" /></MarkSvg>;
}
