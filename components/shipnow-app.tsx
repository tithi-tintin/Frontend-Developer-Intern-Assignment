"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "./layout";
import LoginScreen from "@/screens/login";
import DashboardScreen from "@/screens/dashboard";
import ShipmentsScreen from "@/screens/shipments";
import CreateShipmentScreen from "@/screens/create-shipment";
import InvoicesScreen from "@/screens/invoices";
import WarehouseScreen from "@/screens/warehouse";
import PlaceholderScreen from "@/screens/placeholder";

function normalizedPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function hasSimulatedSession() {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(window.localStorage.getItem("shipnow-session"));
  } catch {
    return false;
  }
}

function protectedPath(path: string) {
  return path !== "/" && path !== "/login";
}

export default function ShipNowApp() {
  const [route, setRoute] = useState("/");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function resolveRoute() {
      const nextRoute = normalizedPath();
      if (protectedPath(nextRoute) && !hasSimulatedSession()) {
        window.history.replaceState({}, "", "/login");
        setRoute("/login");
        return;
      }
      setRoute(nextRoute);
    }

    // Browser path and local session storage are unavailable during SSR.
    resolveRoute();
    const onPop = () => resolveRoute();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, "", path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (route === "/" || route === "/login") {
    return <LoginScreen navigate={navigate} />;
  }

  let screen;
  if (route === "/dashboard") screen = <DashboardScreen navigate={navigate} />;
  else if (route === "/shipments/new") screen = <CreateShipmentScreen navigate={navigate} />;
  else if (route === "/shipments") screen = <ShipmentsScreen navigate={navigate} />;
  else if (route === "/invoices") screen = <InvoicesScreen />;
  else if (route === "/warehouse") screen = <WarehouseScreen />;
  else screen = <PlaceholderScreen route={route} navigate={navigate} />;

  return (
    <AppShell
      route={route}
      navigate={navigate}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
    >
      {screen}
    </AppShell>
  );
}
