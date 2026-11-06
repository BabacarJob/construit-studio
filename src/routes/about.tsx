import { createFileRoute } from "@tanstack/react-router";
import { Eye, Handshake, Scale, Zap } from "lucide-react";
import { PublicLayout, Section, SectionTitle } from "@/components/rp/public-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RentalProof" },
      { name: "description", content: "Why RentalProof exists: fair, evidence-based equipment rentals." },
      { property: "og:title", content: "About RentalProof" },
      { property: "og:description", content: "Our mission, vision and values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PublicLayout>
      <Section className="max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success">About</p>
        <h1 className="text-3xl font-semibold text-primary sm:text-4xl">Fair rentals start with clear evidence.</h1>
        <div className="mt-8 space-y-5 text-muted-foreground">
          <p><strong className="text-primary">Our mission.</strong> Help rental companies protect their equipment and their customer relationships by documenting condition at every handover.</p>
          <p><strong className="text-primary">Why RentalProof exists.</strong> Damage disputes are one of the most expensive and stressful parts of running a rental business. Paper forms get lost, phone photos aren't linked to anything, and nobody remembers who checked what. RentalProof replaces that with a single, timestamped record.</p>
          <p><strong className="text-primary">Product vision.</strong> An independent inspection layer that works alongside any booking or ERP system — fast enough for a busy counter, rigorous enough to settle a claim.</p>
        </div>
      </Section>
      <section className="border-t bg-card">
        <Section>
          <SectionTitle title="Our values" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Scale, "Fairness", "Evidence protects both the rental company and the customer."],
              [Eye, "Transparency", "Every report is clear, readable and shareable."],
              [Zap, "Speed", "An inspection should take minutes, not paperwork."],
              [Handshake, "Trust", "Your data belongs to you, always exportable."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Eye;
              return (
                <div key={t as string} className="rounded-lg border bg-background p-6">
                  <I className="h-5 w-5 text-success" />
                  <h3 className="mt-3 font-semibold text-primary">{t as string}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </section>
    </PublicLayout>
  );
}
