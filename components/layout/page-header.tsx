import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

type PageHeaderProps = {
  title: string;
  breadcrumb?: string;
  action?: ReactNode;
  back?: boolean;
  onBack?: () => void;
  children?: ReactNode;
};

export function PageHeader({
  title,
  breadcrumb,
  action,
  back,
  onBack,
  children,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <h1>
          {back && (
            <button
              type="button"
              className="page-back-button"
              onClick={onBack}
              aria-label="Back to shipments"
            >
              <Icon name="arrowLeft" />
            </button>
          )}
          {title}
        </h1>
        {breadcrumb && <p>{breadcrumb}</p>}
      </div>
      {children}
      {action}
    </header>
  );
}
