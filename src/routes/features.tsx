import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, ClipboardCheck, Columns2, FileText, History, Package, PenLine, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout, Section, SectionTitle } from "@/components/rp/public-layout";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — RentalProof" },
      { name: "description", content: "Equipment management, inspection workflows, photo evidence, signatures and PDF reports." },
      { property: "og:title", content: "RentalProof features" },
      { property: "og:description", content: "Everything rental companies need to document equipment condition." },
    ],
  }),
  component: Features,
});

const items = [
  { icon: Package, title: "Equipment management", text: "Register each item with internal reference, serial number, brand, model, value, accessories and photos. Track status — available, rented or in maintenance." },
  { icon: ClipboardCheck, title: "Inspection workflows", text: "Guided dispatch and return inspections with a consistent checklist, accessory verification and inspector notes." },
  { icon: Camera, title: "Photo documentation", text: "Attach multiple photos per inspection directly from a phone, tablet or computer." },
  { icon: Columns2, title: "Before/after comparison", text: "Return inspections show dispatch photos side by side so condition changes are obvious." },
  { icon: PenLine, title: "Digital signatures", text: "Customer and employee sign on screen. Signatures are embedded in the final report." },
  { icon: FileText, title: "PDF reports", text: "Clean, printable reports with company details, equipment identification, photos, observations and timeline." },
  { icon: History, title: "Inspection history", text: "Every inspection is linked to its equipment and customer, building a complete condition history." },
];

function Features() {
  return (
    <PublicLayout>
      <Section>
        <SectionTitle eyebrow="Features" title="Condition documentation, end to end" text="From registering an item to sharing a signed report." />
        <div className="grid gap-5 md:grid-cols-2">
          {items.map(({ icon: I, title, text }) => (
            <div key={title} className="flex gap-4 rounded-lg border bg-card p-6 shadow-card">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-success-soft">
                <I className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-4 rounded-lg border border-dashed bg-card p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
              <WifiOff className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-primary">
                Offline mode <span className="rounded-full bg-warning-soft px-2 py-0.5 text-xs font-medium text-warning-strong">Planned</span>
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">On our roadmap: complete inspections without a connection and sync later. Not available yet.</p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button variant="success" size="lg" asChild>
            <Link to="/login">Explore the demo</Link>
          </Button>
        </div>
      </Section>
    </PublicLayout>
  );
}
