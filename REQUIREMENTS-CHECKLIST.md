# ShipNow Assignment Requirements Checklist

This checklist was prepared from the complete 10-page Trends Bird Limited
Frontend Developer Intern assignment specification.

## Technology and data

- [x] React with the Next.js App Router-compatible application structure
- [x] TypeScript
- [x] One consistent Tailwind/CSS design-token styling system
- [x] Recharts for dashboard and warehouse charts
- [x] No API calls, application server routes, or database
- [x] Local mock data in `data/`, separated by domain
- [ ] Public deployment URL - candidate must complete this external step

## Responsive application shell

- [x] 1440 px desktop layout with expanded labelled sidebar
- [x] 768 px tablet layout with icon-only sidebar rail and reflowed grids
- [x] 375 px mobile layout with sticky app bar, hamburger drawer, and single columns
- [x] Intermediate layouts prevent page-level horizontal scrolling
- [x] Shared sidebar and footer shell reused by all authenticated screens
- [x] Placeholder destinations for Analytics, Calendar, Tracking, Fleets, and Drivers

## Login

- [x] Split-screen layout
- [x] Required-field validation
- [x] Email-format validation
- [x] Password-length validation
- [x] Working show/hide password control
- [x] Simulated local session
- [x] Successful submission navigates to Dashboard
- [x] Protected routes redirect to Login when no simulated session exists

## Dashboard

- [x] Summary metric cards
- [x] Recharts step/line chart
- [x] Recharts grouped bar chart
- [x] Recharts donut chart
- [x] Data-driven product category visualization
- [x] Live tracking-style map panel
- [x] Shipment alerts
- [x] Searchable and selectable recent shipments table
- [x] Activity timeline

## Shipments - table and grid

- [x] One `/shipments` route with table and grid modes
- [x] View switcher in the breadcrumb/header row
- [x] View switches without a full page reload
- [x] Active view reflected in the URL query
- [x] Four summary metric cards in table mode
- [x] Status tabs/chips filter mock data
- [x] Search filters mock data
- [x] Advanced carrier/category/service filters work
- [x] Functional date-range control in table mode
- [x] Sort control in grid mode
- [x] All table data columns provide sorting
- [x] Row and select-all checkboxes
- [x] Pagination
- [x] Page-size selector
- [x] Empty results state
- [x] Responsive shipment card grid

## Create New Shipment

- [x] Sender and recipient sections
- [x] Package and dimensions sections
- [x] Freight, carrier, method, date, and notes controls
- [x] Additional services and tracking preferences
- [x] Reference error state appears initially
- [x] Invalid submission shows field errors
- [x] Errors clear when fields are edited
- [x] Successful valid submission shows confirmation
- [x] Back button returns to Shipments

## Invoices and Warehouse

- [x] Invoice master-detail selection
- [x] Detail data for more than four invoices
- [x] Subtotal, tax, fee, and total calculated from line items
- [x] Warehouse summary statistics
- [x] Recharts inventory and capacity charts
- [x] Storage table and package-status filter tabs
- [x] Interactive warehouse floor tabs
- [x] Warehouse activity log

## Code quality and accessibility

- [x] Shared reusable UI primitives
- [x] Feature logic decomposed into hooks, components, validation, and utilities
- [x] Central design tokens
- [x] Consistent naming
- [x] Semantic forms, fieldsets, tables, navigation, and headings
- [x] Labelled controls and visible keyboard focus
- [x] Text labels accompany colour-based status information
- [x] Setup instructions, route list, status list, assumptions, and known issues in README

## External submission actions

These cannot be completed inside a source ZIP:

- [ ] Push to a public GitHub repository with genuine incremental commit history
- [ ] Deploy to a publicly accessible host
- [ ] Add the live demo URL to README
- [ ] Verify the deployed URL in private browsing
- [ ] Submit both URLs through the provided Google Form
