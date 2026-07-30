"use client";

import type { ReactNode } from "react";
import { Icon, Logo } from "@/components/icons";
import { getPageTitle } from "./navigation";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  route: string;
  navigate: (path: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  children: ReactNode;
};

export function AppShell({
  route,
  navigate,
  drawerOpen,
  setDrawerOpen,
  children,
}: AppShellProps) {
  const sidebar = (
    <Sidebar
      route={route}
      navigate={navigate}
      closeDrawer={() => setDrawerOpen(false)}
    />
  );

  return (
    <div className="app-shell">
      <header className="mobile-bar">
        <Logo compact />
        <span>{getPageTitle(route)}</span>
        <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation menu">
          <Icon name="menu" />
        </button>
      </header>
      {sidebar}
      {drawerOpen && (
        <div
          className="drawer-layer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            className="drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          />
          {sidebar}
        </div>
      )}
      <main className="app-main">{children}</main>
    </div>
  );
}
