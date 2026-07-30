"use client";

import { useMemo, useState } from "react";
import { Footer, PageHeader } from "@/components/layout";
import { Icon } from "@/components/icons";
import { Button, EmptyState, Panel, Search, StatusBadge } from "@/components/ui";
import { invoices } from "@/data/invoices";
import type { Invoice } from "@/types";

export default function InvoicesScreen() {
  const [selectedId, setSelectedId] = useState("INV-1008");
  const [search, setSearch] = useState("");
  const filtered = invoices.filter((invoice) => `${invoice.id} ${invoice.company} ${invoice.shippingId}`.toLowerCase().includes(search.toLowerCase()));
  const selected = invoices.find((invoice) => invoice.id === selectedId) ?? invoices[0];

  return (
    <div className="page invoices-page">
      <PageHeader title="Invoices & Billing" breadcrumb="Dashboard / Invoices & Billing">
        <Search value={search} onChange={setSearch} />
      </PageHeader>
      <div className="invoice-metrics">
        <InvoiceMetric label="Paid Invoices" value="$28,890" count="350" icon="check" />
        <InvoiceMetric label="Unpaid Invoices" value="$16,700" count="120" icon="invoices" />
        <InvoiceMetric label="Pending Invoices" value="$8,050" count="80" icon="clock" />
        <InvoiceMetric label="Overdue Invoices" value="$22,110" count="245" icon="calendar" />
      </div>
      <div className="invoice-layout">
        <Panel
          title="Invoices"
          action={<div className="invoice-toolbar"><Search value={search} onChange={setSearch} placeholder="Search invoices" /><Button variant="icon"><Icon name="filter" /></Button><Button><span>New Invoice</span><Icon name="plus" /></Button></div>}
          className="invoice-list-panel"
        >
          {filtered.length ? <InvoiceTable rows={filtered} selectedId={selected.id} onSelect={setSelectedId} /> : <EmptyState message="Try another invoice ID or company." />}
        </Panel>
        <InvoiceDetails invoice={selected} />
      </div>
      <Footer />
    </div>
  );
}

function InvoiceMetric({ label, value, count, icon }: { label: string; value: string; count: string; icon: string }) {
  return (
    <article className="invoice-metric">
      <span><Icon name={icon} /></span>
      <div><small>{label}</small><strong>{value}</strong><p>from <b>{count}</b> invoices</p></div>
    </article>
  );
}

function InvoiceTable({ rows, selectedId, onSelect }: { rows: Invoice[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="invoice-table-wrap">
      <table className="invoice-table">
        <thead><tr><th><input type="checkbox" aria-label="Select all invoices" /></th><th>Invoice ID ↕</th><th>Company ↕</th><th className="invoice-tablet-hide">Shipping ID ↕</th><th>Date ↕</th><th className="invoice-tablet-hide">Amount ↕</th><th className="invoice-tablet-hide">Status ↕</th></tr></thead>
        <tbody>{rows.map((invoice, index) => (
          <tr key={invoice.id} className={selectedId === invoice.id ? "selected" : ""} onClick={() => onSelect(invoice.id)}>
            <td><input type="checkbox" checked={selectedId === invoice.id} onChange={() => onSelect(invoice.id)} aria-label={`Select ${invoice.id}`} /></td>
            <td><a>{invoice.id}</a><small>▧</small></td>
            <td><span className="company-cell"><b>{["◆", "▲", "⬟", "●", "◒", "✳", "♜", "M", "❖", "✥", "▰"][index]}</b><span>{invoice.company}</span></span></td>
            <td className="invoice-tablet-hide">#{invoice.shippingId}</td>
            <td><strong>{invoice.issueDate} <small>(Issued)</small></strong><span>{invoice.dueDate} <small>(Due)</small></span></td>
            <td className="invoice-tablet-hide">${invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            <td className="invoice-tablet-hide"><StatusBadge status={invoice.status} /></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function InvoiceDetails({ invoice }: { invoice: Invoice }) {
  const subtotal = useMemo(() => invoice.lines.reduce((total, line) => total + line.price * line.quantity, 0), [invoice]);
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + tax + invoice.fee;
  const money = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Panel
      title={<h2><span className="details-back">‹</span> Invoice Details</h2>}
      action={<div className="detail-actions"><Button variant="secondary">Edit</Button><Button variant="secondary">Hold</Button><Button>Send Invoice</Button></div>}
      className="invoice-detail-panel"
    >
      <div className="invoice-detail-header">
        <span><strong>Invoice <a>#{invoice.id}</a></strong><StatusBadge status={invoice.status} /></span>
        <span><small>Issue Date <b>{invoice.issueDate}</b></small><small>Due Date <b>{invoice.dueDate}</b></small></span>
      </div>
      <div className="billing-card">
        <div><small>Bill From</small><strong>{invoice.company}</strong><span>{invoice.email}</span><span>{invoice.address}</span><span>{invoice.phone}</span></div>
        <div><small>Bill To</small><strong>ShipNow Logistics</strong><span>accounts@shipnow.com</span><span>901 Distribution Ave, Charlotte, NC 28217, USA</span><span>+1 704-555-9911</span></div>
      </div>
      <h3>Package Summary</h3>
      <div className="line-items-wrap">
        <table className="line-items">
          <thead><tr><th>Description ↕</th><th>Shipment Type ↕</th><th>Price ↕</th><th>Qty ↕</th><th>Amount ↕</th></tr></thead>
          <tbody>{invoice.lines.map((line, index) => (
            <tr key={`${line.description}-${index}`}><td>{line.description}</td><td>{line.shipmentType}</td><td>{money(line.price)}</td><td>{line.quantity}</td><td>{money(line.price * line.quantity)}</td></tr>
          ))}</tbody>
          <tfoot>
            <tr><td colSpan={4}>Sub Total</td><td>{money(subtotal)}</td></tr>
            <tr><td colSpan={4}>Tax ({invoice.taxRate * 100}%)</td><td>{money(tax)}</td></tr>
            <tr><td colSpan={4}>Fee</td><td>{money(invoice.fee)}</td></tr>
            <tr><td colSpan={4}>Total</td><td>{money(total)}</td></tr>
          </tfoot>
        </table>
      </div>
      <div className="invoice-note"><strong>Note</strong><p>Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.</p></div>
      <div className="mobile-detail-actions"><Button variant="secondary">Edit</Button><Button variant="secondary">Hold</Button><Button>Send Invoice</Button></div>
    </Panel>
  );
}
