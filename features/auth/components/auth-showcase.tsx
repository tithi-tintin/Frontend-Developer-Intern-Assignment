import { Logo } from "@/components/icons";

export function AuthShowcase() {
  return (
    <section className="login-showcase">
      <Logo light />

      <div
        className="login-collage"
        role="img"
        aria-label="A delivery van loaded with parcels and a customer arranging a shipment"
      >
        <div className="delivery-photo" aria-hidden="true">
          <span className="street-van">
            <span className="van-load">
              {Array.from({ length: 14 }, (_, index) => (
                <i key={index} />
              ))}
            </span>
          </span>
          <span className="street-parcels">
            <i /><i /><i /><i />
          </span>
        </div>

        <div className="customer-photo" aria-hidden="true">
          <span className="customer-person">
            <i className="customer-hair" />
            <i className="customer-face" />
            <i className="customer-body" />
          </span>
          <span className="customer-phone" />
          <span className="customer-desk" />
        </div>
      </div>

      <div className="showcase-copy">
        <h1>Welcome to ShipNow</h1>
        <p>Manage your shipments, fleet, and warehouse in one smart dashboard.</p>
      </div>
    </section>
  );
}
