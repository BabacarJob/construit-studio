import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, CheckCircle2, ClipboardCheck, FileText, PenLine, Package, RotateCcw, Clapperboard, Music, PartyPopper, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PublicLayout, Section, SectionTitle } from "@/components/rp/public-layout";
import { StatusBadge } from "@/components/rp/common";
import { PLANS } from "@/lib/data";
import camera from "@/assets/eq-camera.jpg";
import lens from "@/assets/eq-lens.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RentalProof — Equipment inspection software for rental companies" },
      { name: "description", content: "Document equipment condition before dispatch and after return with photos, signatures and PDF reports." },
      { property: "og:title", content: "RentalProof — Every rental. Every condition. Documented." },
      { property: "og:description", content: "Inspection and condition documentation platform for equipment rental companies." },
    ],
  }),
  component: Landing,
});

export const FAQ = [
  ["Do my customers need an account?", "No. Customers sign directly on the inspector's device during handover and return."],
  ["Can I use RentalProof on a tablet?", "Yes. The interface is designed for desktop, tablet and phone so inspections can happen at the counter or on site."],
  ["What happens when damage is found?", "Inspectors record the damaged area, severity and photos. The report compares dispatch and return photos side by side."],
  ["Can I export reports?", "Every completed inspection produces a printable report you can save as PDF and share with your customer."],
];

function Landing() {
  return (
    <PublicLayout>
      <Section className="pb-10 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Equipment inspection SaaS
          </span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-primary sm:text-5xl">
            Every rental. Every condition.<br className="hidden sm:block" /> Documented.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            RentalProof records the condition of your equipment at dispatch and return — with photos, checklists and
            signatures — so damage disputes end with evidence, not arguments.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="success" asChild>
              <Link to="/register">Start free <ArrowRight /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Try the demo</Link>
            </Button>
          </div>
        </div>
        <DashboardPreview />
      </Section>

      <section className="border-y bg-card">
        <Section className="py-16">
          <SectionTitle eyebrow="How it works" title="Three steps per rental" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [Package, "1. Dispatch inspection", "Check the item, take photos and get the customer's signature before it leaves."],
              [RotateCcw, "2. Return inspection", "Compare return photos with dispatch photos and flag any change in condition."],
              [FileText, "3. Shareable report", "A timestamped PDF report with both inspections, signatures and observations."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Package;
              return (
                <div key={t as string} className="rounded-lg border bg-background p-6">
                  <I className="h-5 w-5 text-success" />
                  <h3 className="mt-4 font-semibold text-primary">{t as string}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </section>

      <Section>
        <SectionTitle eyebrow="Features" title="Built for the rental counter" text="Everything you need to prove condition, without spreadsheets or paper forms." />
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[
            [Package, "Equipment registry", "Serial numbers, accessories, value and condition history for every item."],
            [ClipboardCheck, "Guided checklists", "Consistent inspections across every member of your team."],
            [Camera, "Photo evidence", "Before and after photos attached to each inspection."],
            [PenLine, "Digital signatures", "Customer and employee sign on screen at handover and return."],
            [Wrench, "Damage records", "Area, severity and description for each issue found."],
            [FileText, "PDF reports", "Professional, printable reports branded with your company."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Package;
            return (
              <div key={t as string} className="bg-card p-6">
                <I className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-medium text-primary">{t as string}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link to="/features">See all features <ArrowRight /></Link>
          </Button>
        </div>
      </Section>

      <section className="bg-primary text-primary-foreground">
        <Section className="py-16">
          <h2 className="text-center text-2xl font-semibold">Made for rental businesses</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              [Clapperboard, "Camera & film rental"],
              [Music, "Audio & backline"],
              [PartyPopper, "Event equipment"],
              [Wrench, "Tools & machinery"],
            ].map(([Icon, t]) => {
              const I = Icon as typeof Package;
              return (
                <div key={t as string} className="rounded-lg border border-sidebar-border p-5 text-center">
                  <I className="mx-auto h-6 w-6 text-success" />
                  <p className="mt-3 text-sm">{t as string}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </section>

      <Section>
        <SectionTitle eyebrow="Testimonials" title="What rental teams say" text="Demo testimonials — illustrative content only." />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["We stopped losing deposits disputes the week we switched. The photo comparison does the talking.", "Rental manager, demo camera house"],
            ["Our inspectors follow the same checklist now, whether it's a junior on Saturday or me on Monday.", "Operations lead, demo AV company"],
            ["Customers trust us more because they get a clean report at every return.", "Founder, demo event rentals"],
          ].map(([q, a]) => (
            <figure key={a} className="rounded-lg border bg-card p-6 shadow-card">
              <blockquote className="text-sm leading-relaxed text-foreground">“{q}”</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">{a}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <section className="border-y bg-card">
        <Section className="py-16">
          <SectionTitle eyebrow="Pricing" title="Simple, transparent plans" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div key={p.name} className={`rounded-lg border p-5 ${p.name === "Professional" ? "border-success ring-1 ring-success" : ""}`}>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="mt-2 text-3xl font-semibold text-primary">${p.monthly}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/pricing">Compare plans</Link>
            </Button>
          </div>
        </Section>
      </section>

      <Section className="max-w-3xl">
        <SectionTitle title="Frequently asked questions" />
        <Accordion type="single" collapsible className="rounded-lg border bg-card px-5">
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-primary px-8 py-10 text-primary-foreground md:flex-row">
          <div>
            <h2 className="text-2xl font-semibold">Start documenting every rental today</h2>
            <p className="mt-2 text-sm opacity-80">Free plan available. No credit card required.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="success" size="lg" asChild>
              <Link to="/register">Create account</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </PublicLayout>
  );
}

function DashboardPreview() {
  return (
    <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="flex items-center gap-1.5 border-b bg-muted px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs text-muted-foreground">app.rentalproof.com/inspections/INS-1002</span>
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_280px]">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Return inspection · INS-1002</p>
              <p className="font-semibold text-primary">Canon RF 70-200mm f/2.8L</p>
            </div>
            <StatusBadge status="Damaged" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[["Dispatch", camera], ["Return", lens]].map(([l, src]) => (
              <div key={l}>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">{l}</p>
                <img src={src} alt={`${l} photo`} width={944} height={704} className="aspect-[4/3] w-full rounded-md border object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          {["Body / housing intact", "Power on & functional test", "Glass free of scratches", "Accessories complete"].map((c, i) => (
            <div key={c} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
              <CheckCircle2 className={`h-4 w-4 ${i === 2 ? "text-destructive" : "text-success"}`} />
              {c}
            </div>
          ))}
          <div className="rounded-md bg-destructive-soft p-3 text-xs text-destructive">
            Major · Front element — deep scratch across the glass.
          </div>
        </div>
      </div>
    </div>
  );
}
