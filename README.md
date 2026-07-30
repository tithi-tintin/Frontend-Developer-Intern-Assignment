# ShipNow Logistics Dashboard

A responsive frontend implementation of the ShipNow logistics and shipment-management dashboard for the Trends Bird Limited Frontend Developer Intern assignment.

## Live demo
[Open the live ShipNow application](https://frontend-developer-intern-assignmen-two.vercel.app/)

Demo login: enter any valid email address and any password containing at least 6 characters.

## Technology

- React 19
- Next.js App Router-compatible routing through Vinext
- TypeScript
- Tailwind CSS build pipeline with a custom CSS design system
- Recharts data visualizations
- Local, domain-separated mock data
- No API calls, server routes, database, or external state-management package

## Setup

Requirements:

- Node.js 22.13 or newer
- npm

Install and start:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The repository includes `vercel.json`, so it can be imported directly into
Vercel as a Next.js project. Vercel will use the dedicated `build:vercel`
command. The default `build` command produces the validated Vinext/Cloudflare
artifact used by the provided Sites environment.

After deploying, replace the pending text in the Live demo section with the
public deployment URL and confirm it works in a private browsing window.

## Routes

- `/` or `/login` - Login
- `/dashboard` - Dashboard
- `/shipments?view=table` - Shipments table mode
- `/shipments?view=grid` - Shipments grid mode
- `/shipments/new` - Create New Shipment
- `/invoices` - Invoices & Billing
- `/warehouse` - Warehouse
- `/analytics`, `/calendar`, `/tracking`, `/fleets`, `/drivers` - Required navigation placeholders

## Screen status

| Screen | Status | Included behaviour |
|---|---|---|
| Login and registration | Complete | Required/email/password-length validation, confirmation validation, show/hide password, remember-me, simulated session, dashboard redirect |
| Dashboard | Complete | Reusable shell, summary metrics, data-driven charts, tracking, alerts, recent shipments, activity timeline |
| Shipments - Table | Complete | Search, status filtering, sorting, row selection, select-all, pagination, page-size control |
| Shipments - Grid | Complete | Search, status filtering, sorting, responsive cards, shared pagination |
| Shipments view switcher | Complete | One `/shipments` route, no reload, active mode reflected in the URL query |
| Create New Shipment | Complete | Responsive multi-section form, error state, validation, field-level error clearing, reset and success state |
| Invoices & Billing | Complete | Master-detail selection, eleven invoice rows, line items for every invoice, calculated subtotal/tax/fee/total |
| Warehouse | Complete | Statistics, data-driven inventory/capacity charts, storage table, package tabs, floor tabs and activity log |
| Placeholder destinations | Complete | Analytics, Calendar, Tracking, Fleets and Drivers remain visible and navigable |

## Responsive behaviour

The interface implements the three required design targets:

- Desktop: 1440 px, full sidebar, multi-column layouts
- Tablet: 768 px, icon-only navigation rail, reflowed grids
- Mobile: 375 px, sticky app bar, drawer navigation, single-column sections

Intermediate widths avoid horizontal page scrolling by reducing nonessential table columns and reflowing grids.

## Project structure

```text
app/                         App Router entry points and global design tokens
components/                  Reusable application-wide UI
  layout/                    Shared shell, sidebar, page header and footer
features/                    Domain modules with their own UI and logic
  auth/
    components/              Authentication form and presentation components
    hooks/                   Authentication state and submission flow
    validation.ts            Pure client-side validation
  shipments/
    components/              Toolbar, filters, table, cards and pagination
    hooks/                   Search, sorting, filtering, selection and paging state
    constants.ts             Status tabs and filter choices
    utils.ts                 Pure filtering and sorting functions
  create-shipment/
    components/              Reusable form controls
    hooks/                   Form state, submission and reset behaviour
    validation.ts            Pure shipment-form validation
data/                        Static mock data separated by domain
screens/                     Thin screen composition components
types/                       Shared TypeScript domain types
tests/                       Source architecture and rendered application checks
```

## Architecture

- Screen files only compose feature components and shared layout components.
- Feature-specific state lives in custom hooks instead of being mixed into page markup.
- Validation and filtering are pure functions, making their rules easy to read and test.
- Repeated controls such as authentication fields, shipment filters, table sorting,
  pagination and shipment-form fields are reusable components.
- Static records stay in `data/`; UI components do not define domain mock data.
- The application shell is implemented once and reused by every authenticated route.
- No backend or database code is included because the assignment explicitly requires
  static mock data and no API integration.

## Accessibility

- Semantic forms, fieldsets, tables, navigation and headings
- Labelled inputs and controls
- Visible keyboard focus indicators
- ARIA labels on icon-only controls and charts
- Status information communicated with text, not colour alone

## Assumptions

- The two photographic login images were replaced with CSS-based photographic-style compositions, which is allowed by the assignment.
- Dashboard and warehouse charts are rendered from domain mock data with Recharts. They are not static images.
- Table columns that do not fit at tablet/mobile widths are deliberately removed in the same spirit as the supplied responsive frames.
- The required table/grid switcher was designed using the existing violet, white, and charcoal design system because it is intentionally absent from the Figma frames.
- Placeholder navigation pages contain a concise explanation because no corresponding designs were supplied.

## Known issues

- No known blocking issues in the deployed frontend.
- The supplied tablet/mobile screenshots were compressed; small type inherits its exact content from the corresponding desktop references.

## Submission checklist

Before submitting:

1. Push this source to a public GitHub repository with clear incremental commits.
2. Deploy it to Vercel, Netlify, or an equivalent public host.
3. Replace the pending Live demo text above with the public URL.
4. Test the deployed URL in a private browsing window.
5. Submit both links through the assignment Google Form.

See `REQUIREMENTS-CHECKLIST.md` for the complete specification audit.
