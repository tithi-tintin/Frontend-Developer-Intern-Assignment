"use client";

import { Footer, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui";
import { Check, Dimension, Field, PhoneField } from "@/features/create-shipment/components/form-controls";
import { freightTypes } from "@/features/create-shipment/constants";
import { useShipmentForm } from "@/features/create-shipment/hooks/use-shipment-form";

export default function CreateShipmentScreen({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const form = useShipmentForm();
  const { fields, errors, services } = form;

  return (
    <div className="page create-page">
      <PageHeader
        title="Create New Shipment"
        breadcrumb="Dashboard / Shipments / Create New Shipment"
        back
        onBack={() => navigate("/shipments")}
      />
      {form.success && <div className="success-banner" role="status">{form.success}</div>}
      <form className="shipment-form panel" onSubmit={form.submit} noValidate>
        <h2>Shipment Form</h2>
        <section className="contact-section">
          <fieldset>
            <legend>Sender Info</legend>
            <Field label="Company" name="senderCompany" value={fields.senderCompany} error={errors.senderCompany} onChange={form.updateField} wide />
            <div className="field-row">
              <Field label="Email" name="senderEmail" value={fields.senderEmail} error={errors.senderEmail} onChange={form.updateField} type="email" />
              <PhoneField label="Phone Number" name="senderPhone" value={fields.senderPhone} error={errors.senderPhone} onChange={form.updateField} />
            </div>
            <Field label="Pickup Address" name="pickupAddress" value={fields.pickupAddress} error={errors.pickupAddress} onChange={form.updateField} wide />
          </fieldset>
          <fieldset>
            <legend>Recipient Info</legend>
            <Field label="Company" name="recipientCompany" value={fields.recipientCompany} error={errors.recipientCompany} onChange={form.updateField} wide />
            <div className="field-row">
              <Field label="Email" name="recipientEmail" value={fields.recipientEmail} error={errors.recipientEmail} onChange={form.updateField} type="email" />
              <PhoneField label="Phone Number" name="recipientPhone" value={fields.recipientPhone} error={errors.recipientPhone} onChange={form.updateField} />
            </div>
            <Field label="Delivery Address" name="deliveryAddress" value={fields.deliveryAddress} error={errors.deliveryAddress} onChange={form.updateField} placeholder="Street address, city, state/province, ZIP code" wide />
          </fieldset>
        </section>
        <div className="form-lower">
          <fieldset className="package-details">
            <legend>Package Details</legend>
            <Field label="Item Description" name="description" value={fields.description} error={errors.description} onChange={form.updateField} wide />
            <div className="field-row three">
              <Field label="Quantity" name="quantity" value={fields.quantity} error={errors.quantity} onChange={form.updateField} type="number" />
              <Field label="Value" name="value" value={fields.value} error={errors.value} onChange={form.updateField} type="number" prefix="$" />
              <Field label="Weight" name="weight" value={fields.weight} error={errors.weight} onChange={form.updateField} type="number" />
              <label className="form-field"><span>Units</span><select value={fields.unit} onChange={(event) => form.updateField("unit", event.target.value)}><option>Kg</option><option>Lb</option></select></label>
            </div>
            <span className="field-group-label">Dimensions</span>
            <div className="dimensions">
              <Dimension label="Length" name="length" value={fields.length} error={errors.length} onChange={form.updateField} />
              <Dimension label="Width" name="width" value={fields.width} error={errors.width} onChange={form.updateField} />
              <Dimension label="Height" name="height" value={fields.height} error={errors.height} onChange={form.updateField} placeholder="ex. 20" />
            </div>
          </fieldset>
          <fieldset className="shipping-details">
            <legend>Shipping Details</legend>
            <span className="field-group-label">Freight Type</span>
            <div className="radio-row">
              {freightTypes.map((item) => (
                <label key={item}><input type="radio" name="freight" checked={fields.freight === item} onChange={() => form.updateField("freight", item)} /><span>{item}</span></label>
              ))}
            </div>
            <div className="shipping-grid">
              <label className="form-field"><span>Carrier</span><select value={fields.carrier} onChange={(event) => form.updateField("carrier", event.target.value)}><option>FedEx</option><option>DHL</option><option>UPS</option><option>USPS</option></select></label>
              <label className="form-field">
                <span>Shipping Method</span>
                <select value={fields.shippingMethod} onChange={(event) => form.updateField("shippingMethod", event.target.value)} className={errors.shippingMethod ? "invalid" : ""} aria-invalid={Boolean(errors.shippingMethod)}>
                  <option value="">Select Method</option><option>Express</option><option>Standard</option><option>Economy</option>
                </select>
                {errors.shippingMethod && <small className="field-error">{errors.shippingMethod}</small>}
              </label>
              <label className="form-field"><span>Shipment ID</span><input value="#SH9583742" disabled /><small>Auto-generated</small></label>
              <label className="form-field"><span>Shipment Date</span><input type="date" value={fields.date} onChange={(event) => form.updateField("date", event.target.value)} /></label>
            </div>
            <label className="form-field notes"><span>Notes</span><textarea value={fields.notes} onChange={(event) => form.updateField("notes", event.target.value)} placeholder="Add special delivery notes (optional)" /></label>
            <div className="services-row">
              <div>
                <span className="field-group-label">Additional Services</span>
                <div className="checkbox-grid">
                  <Check label="Insurance Coverage" checked={services.insurance} onChange={(checked) => form.updateService("insurance", checked)} />
                  <Check label="Temperature Control" checked={services.temperature} onChange={(checked) => form.updateService("temperature", checked)} />
                  <Check label="Signature on Delivery" checked={services.signature} onChange={(checked) => form.updateService("signature", checked)} />
                  <Check label="Fragile Item Handling" checked={services.fragile} onChange={(checked) => form.updateService("fragile", checked)} />
                </div>
              </div>
              <div>
                <span className="field-group-label">Tracking & Status Updates</span>
                <label className="toggle-label"><input type="checkbox" checked={services.notify} onChange={(event) => form.updateService("notify", event.target.checked)} /><i /><span>Notify Recipient via Email/SMS</span></label>
              </div>
            </div>
          </fieldset>
        </div>
        <footer className="form-actions"><Button variant="secondary" type="button" onClick={form.reset}>Delete Form</Button><Button type="submit">Submit Shipment</Button></footer>
      </form>
      <Footer />
    </div>
  );
}
