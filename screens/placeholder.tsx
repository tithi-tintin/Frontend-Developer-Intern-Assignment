import { Footer, PageHeader } from "@/components/layout";
import { Button, Panel } from "@/components/ui";

export default function PlaceholderScreen({
  route,
  navigate,
}: {
  route: string;
  navigate: (path: string) => void;
}) {
  const title = route.slice(1).replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  return (
    <div className="page">
      <PageHeader title={title} breadcrumb={`Dashboard / ${title}`} />
      <Panel className="placeholder">
        <span>Coming soon</span>
        <h2>{title}</h2>
        <p>This navigation destination is included as required. The assignment does not provide a detailed screen for it.</p>
        <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
      </Panel>
      <Footer />
    </div>
  );
}
