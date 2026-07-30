import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const readAll = async (paths) => (await Promise.all(paths.map(read))).join("\n");

test("keeps assignment data separated by domain", async () => {
  const files = await Promise.all([
    read("data/dashboard.ts"),
    read("data/shipments.ts"),
    read("data/invoices.ts"),
    read("data/warehouse.ts"),
  ]);
  assert.ok(files.every((source) => source.length > 200));
});

test("implements one shipments route with both view modes", async () => {
  const source = await readAll([
    "features/shipments/types.ts",
    "features/shipments/hooks/use-shipments.ts",
  ]);
  assert.match(source, /type ViewMode = "table" \| "grid"/);
  assert.match(source, /\/shipments\?view=/);
  assert.match(source, /replaceState/);
});

test("calculates invoice totals from line items", async () => {
  const source = await read("screens/invoices.tsx");
  assert.match(source, /reduce\(\(total, line\) => total \+ line\.price \* line\.quantity/);
  assert.match(source, /const total = subtotal \+ tax \+ invoice\.fee/);
});

test("implements required form validation", async () => {
  const login = await read("features/auth/validation.ts");
  const shipment = await read("features/create-shipment/validation.ts");
  assert.match(login, /Enter a valid email address/);
  assert.match(login, /at least 6 characters/);
  assert.match(shipment, /Address is required/);
  assert.match(shipment, /Shipping method is required/);
});

test("implements registration and shipment filter interactions", async () => {
  const login = await readAll([
    "features/auth/types.ts",
    "features/auth/validation.ts",
    "features/auth/hooks/use-auth-form.ts",
  ]);
  const shipments = await readAll([
    "features/shipments/hooks/use-shipments.ts",
    "features/shipments/utils.ts",
  ]);
  assert.match(login, /type AuthMode = "login" \| "register"/);
  assert.match(login, /Passwords do not match/);
  assert.match(login, /shipnow-account/);
  assert.match(shipments, /applyFilters/);
  assert.match(shipments, /filters\.carrier === "All"/);
  assert.match(shipments, /filters\.category === "All"/);
  assert.match(shipments, /filters\.service === "All"/);
});

test("keeps screens focused on composition and moves feature logic into modules", async () => {
  const screens = await Promise.all([
    read("screens/login.tsx"),
    read("screens/shipments.tsx"),
    read("screens/create-shipment.tsx"),
  ]);

  assert.ok(screens.every((source) => source.split("\n").length < 120));

  const featureModules = await Promise.all([
    read("features/auth/hooks/use-auth-form.ts"),
    read("features/shipments/hooks/use-shipments.ts"),
    read("features/shipments/components/shipment-table.tsx"),
    read("features/create-shipment/hooks/use-shipment-form.ts"),
  ]);
  assert.ok(featureModules.every((source) => source.length > 300));
});

test("supports create-shipment back navigation and violet validation errors", async () => {
  const navigation = await readAll([
    "components/layout/page-header.tsx",
    "components/shipnow-app.tsx",
    "screens/create-shipment.tsx",
  ]);
  const styles = await read("app/globals.css");

  assert.match(navigation, /className="page-back-button"/);
  assert.match(navigation, /onBack=\{\(\) => navigate\("\/shipments"\)\}/);
  assert.match(navigation, /CreateShipmentScreen navigate=\{navigate\}/);
  assert.match(styles, /--error: #8068f2/);
  assert.match(styles, /\.field-error \{[^}]*color: var\(--error\)/);
  assert.match(styles, /input\.invalid[^}]*border-color: var\(--error\)/);
});

test("matches the dashboard shipment type and recent panels references", async () => {
  const dashboard = await readAll([
    "screens/dashboard.tsx",
    "components/charts.tsx",
    "features/dashboard/components/shipment-type-card.tsx",
    "features/dashboard/components/recent-dashboard-panels.tsx",
    "data/dashboard.ts",
  ]);
  const packageJson = await read("package.json");
  const styles = await read("app/globals.css");

  assert.match(dashboard, /className="shipment-type-donut"/);
  assert.match(dashboard, /Total Shipment/);
  assert.match(dashboard, />2,500</);
  assert.match(packageJson, /"recharts"/);
  assert.match(dashboard, /from "recharts"/);
  assert.match(dashboard, /ResponsiveContainer/);
  assert.match(styles, /\.dashboard-bottom-row \{/);
  assert.match(dashboard, /type="checkbox"/);
  assert.match(dashboard, /shipment\.category/);
  assert.match(dashboard, /ActivityCopy/);
  assert.match(dashboard, /status: "Processing"/);
  assert.match(dashboard, /status: "Delivered"/);
});

test("implements the remaining written functional requirements", async () => {
  const shipments = await readAll([
    "features/shipments/types.ts",
    "features/shipments/hooks/use-shipments.ts",
    "features/shipments/utils.ts",
    "features/shipments/components/shipment-toolbar.tsx",
    "features/shipments/components/shipment-table.tsx",
    "features/shipments/components/shipment-pagination.tsx",
  ]);
  const session = await readAll([
    "components/shipnow-app.tsx",
    "features/auth/hooks/use-auth-form.ts",
  ]);

  assert.match(shipments, /ShipmentDateRange/);
  assert.match(shipments, /matchesDateRange/);
  assert.match(shipments, /field="productCategory"/);
  assert.match(shipments, /field="weight"/);
  assert.match(shipments, /field="origin"/);
  assert.match(shipments, /field="issueDate"/);
  assert.match(shipments, /<option value="11">11<\/option>/);
  assert.match(session, /shipnow-session/);
  assert.match(session, /hasSimulatedSession/);
  assert.match(session, /replaceState\(\{\}, "", "\/login"\)/);
});

test("matches the shipment table reference structure and data presentation", async () => {
  const table = await readAll([
    "features/shipments/components/shipment-table.tsx",
    "features/shipments/components/company-mark.tsx",
    "features/shipments/components/shipment-metrics.tsx",
    "features/shipments/components/shipment-pagination.tsx",
  ]);
  const behavior = await readAll([
    "features/shipments/hooks/use-shipments.ts",
    "features/shipments/utils.ts",
    "data/shipments.ts",
  ]);
  const styles = await read("app/globals.css");

  assert.match(table, /className="freight-icon"/);
  assert.match(table, /CompanyMark/);
  assert.match(table, /\(Origin\)/);
  assert.match(table, /\(Destination\)/);
  assert.match(table, /label="ATD"/);
  assert.match(table, /label="ETA"/);
  assert.match(table, /className="progress-cell"/);
  assert.match(styles, /\.shipment-table \.status::before/);
  assert.match(styles, /\.shipments-content\.table \.shipment-toolbar \.tabs/);
  assert.match(behavior, /useState<SortDirection>\(null\)/);
  assert.match(behavior, /520 : 1240/);
  assert.match(behavior, /Array\.from\(\{ length: 176 \}/);
});

test("matches grid, create shipment, and warehouse references", async () => {
  const grid = await readAll([
    "screens/shipments.tsx",
    "features/shipments/hooks/use-shipments.ts",
    "features/shipments/components/shipment-card.tsx",
    "features/shipments/components/company-mark.tsx",
    "data/shipments.ts",
  ]);
  const createShipment = await read(
    "features/create-shipment/components/form-controls.tsx",
  );
  const warehouse = await read("screens/warehouse.tsx");
  const styles = await read("app/globals.css");

  assert.match(grid, /ShipmentViewSwitcher/);
  assert.match(grid, /gridBaseShipments/);
  assert.match(grid, /Array\.from\(\{ length: 192 \}/);
  assert.match(grid, /view === "grid" \? 520 : 1240/);
  assert.match(grid, /CompanyMark/);
  assert.match(grid, /company === "QuickParts"/);
  assert.match(createShipment, /className="us-flag"/);
  assert.match(createShipment, /type="tel"/);
  assert.match(styles, /\.us-flag::before/);
  assert.match(styles, /\.package-panel \{ grid-column: 3; grid-row: 2; \}/);
  assert.match(styles, /\.warehouse-activity \{ grid-column: 3; grid-row: 3; \}/);
  assert.match(warehouse, /item === "Rail Freight" \? "warehouse"/);
});
