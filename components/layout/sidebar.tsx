import { Icon, Logo } from "@/components/icons";
import { Button } from "@/components/ui";
import { navItems, utilityItems } from "./navigation";

type SidebarProps = {
  route: string;
  navigate: (path: string) => void;
  closeDrawer: () => void;
};

export function Sidebar({ route, navigate, closeDrawer }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo"><Logo /></div>
      <button className="profile-card" aria-label="Open profile menu">
        <span className="avatar">JD</span>
        <span><strong>John Doe</strong><small>Admin</small></span>
        <Icon name="chevron" />
      </button>
      <nav aria-label="Primary navigation">
        {navItems.map(([icon, label, path]) => {
          const active =
            route === path ||
            (path === "/shipments" && route.startsWith("/shipments"));

          return (
            <button
              key={path}
              className={active ? "active" : ""}
              onClick={() => {
                navigate(path);
                closeDrawer();
              }}
              title={label}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-utilities">
        {utilityItems.map(([icon, label, badge]) => (
          <button key={label} title={label}>
            <Icon name={icon} />
            <span>{label}</span>
            {badge && <b>{badge}</b>}
          </button>
        ))}
      </div>
      <div className="pro-card">
        <i />
        <strong>Loving<br />ShipNow<br />Free?</strong>
        <p>Go Pro to access priority support, real-time tracking, and full analytics.</p>
        <Button variant="secondary">Go Pro Today</Button>
      </div>
    </aside>
  );
}
