import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./common";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-sm font-medium text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button variant="success" asChild>
              <Link to="/register">Start free</Link>
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm hover:bg-muted">
                    {n.label}
                  </Link>
                ))}
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm hover:bg-muted">
                  Sign in
                </Link>
                <Button variant="success" className="mt-3" asChild>
                  <Link to="/register">Start free</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Every rental. Every condition. Documented.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-primary">Product</p>
            <Link to="/features" className="block text-muted-foreground hover:text-primary">Features</Link>
            <Link to="/pricing" className="block text-muted-foreground hover:text-primary">Pricing</Link>
            <Link to="/login" className="block text-muted-foreground hover:text-primary">Demo login</Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-primary">Company</p>
            <Link to="/about" className="block text-muted-foreground hover:text-primary">About</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
          </div>
        </div>
        <div className="border-t py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RentalProof. Demo frontend — no real data is stored on a server.
        </div>
      </footer>
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-5 py-16 sm:py-20 ${className}`}>{children}</section>;
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}
