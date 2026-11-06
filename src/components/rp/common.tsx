import { Link } from "@tanstack/react-router";
import { ShieldCheck, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Logo({ light = false, to = "/" }: { light?: boolean; to?: "/" | "/app/dashboard" }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-success text-success-foreground">
        <ShieldCheck className="h-4 w-4" />
      </span>
      <span className={cn("text-[15px]", light ? "text-sidebar-accent-foreground" : "text-primary")}>
        RentalProof
      </span>
    </Link>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-primary sm:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2 no-print">{actions}</div>}
    </div>
  );
}

const statusMap: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  Available: "success",
  Completed: "success",
  Active: "success",
  Excellent: "success",
  Ready: "info",
  Sent: "success",
  Good: "info",
  Rented: "info",
  Dispatch: "info",
  Return: "neutral",
  "Pending return": "warning",
  Draft: "neutral",
  Invited: "warning",
  Fair: "warning",
  Maintenance: "warning",
  Minor: "warning",
  Moderate: "warning",
  Damaged: "danger",
  Major: "danger",
  Deactivated: "neutral",
  Archived: "neutral",
  Paid: "success",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={statusMap[status] ?? "neutral"}>{status}</Badge>;
}

export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("rounded-lg border bg-card shadow-card", className)}>
      {title && (
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <h2 className="text-sm font-semibold text-primary">{title}</h2>
          {action}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="font-medium text-primary">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Field({ label, error, children, hint }: { label: string; error?: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function DL({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="text-xs text-muted-foreground">{k}</dt>
          <dd className="mt-0.5 font-medium text-foreground">{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
