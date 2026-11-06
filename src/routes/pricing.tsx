import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PublicLayout, Section, SectionTitle } from "@/components/rp/public-layout";
import { PLANS, yearlyPrice } from "@/lib/data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — RentalProof" },
      { name: "description", content: "Free, Starter, Professional and Business plans for equipment rental inspection." },
      { property: "og:title", content: "RentalProof pricing" },
      { property: "og:description", content: "Plans from $0 to $99 per month. Save 20% with yearly billing." },
    ],
  }),
  component: Pricing,
});

const rows: [string, (string | boolean)[]][] = [
  ["Equipment items", ["10", "100", "500", "Unlimited"]],
  ["Inspections / month", ["20", "200", "Unlimited", "Unlimited"]],
  ["Team members", ["1", "3", "10", "Unlimited"]],
  ["PDF reports", [true, true, true, true]],
  ["Digital signatures", [false, true, true, true]],
  ["Before/after comparison", [false, false, true, true]],
  ["Custom report branding", [false, false, true, true]],
  ["Advanced roles & permissions", [false, false, false, true]],
  ["Priority support", [false, false, false, true]],
];

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <PublicLayout>
      <Section>
        <SectionTitle eyebrow="Pricing" title="Plans that grow with your fleet" text="Start free and upgrade when your team needs more." />
        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span className={yearly ? "text-muted-foreground" : "font-medium text-primary"}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
          <span className={yearly ? "font-medium text-primary" : "text-muted-foreground"}>Yearly</span>
          <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">Save 20%</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => {
            const featured = p.name === "Professional";
            return (
              <div key={p.name} className={`flex flex-col rounded-lg border bg-card p-6 shadow-card ${featured ? "border-success ring-1 ring-success" : ""}`}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary">{p.name}</p>
                  {featured && <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs text-success">Most popular</span>}
                </div>
                <p className="mt-4 text-3xl font-semibold text-primary">
                  ${yearly ? yearlyPrice(p.monthly) : p.monthly}
                  <span className="text-sm font-normal text-muted-foreground">/{yearly ? "year" : "month"}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{f}</li>
                  ))}
                </ul>
                <Button className="mt-6" variant={featured ? "success" : "outline"} asChild>
                  <Link to="/register">{p.monthly === 0 ? "Start free" : `Choose ${p.name}`}</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <h3 className="mb-4 mt-16 text-lg font-semibold text-primary">Compare features</h3>
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b bg-muted text-left">
                <th className="px-4 py-3 font-medium">Feature</th>
                {PLANS.map((p) => <th key={p.name} className="px-4 py-3 text-center font-medium">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, vals]) => (
                <tr key={label} className="border-b last:border-0">
                  <td className="px-4 py-3">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {typeof v === "string" ? v : v ? <Check className="mx-auto h-4 w-4 text-success" /> : <Minus className="mx-auto h-4 w-4 text-muted-foreground" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-4 text-lg font-semibold text-primary">Billing FAQ</h3>
          <Accordion type="single" collapsible className="rounded-lg border bg-card px-5">
            {[
              ["Can I change plans anytime?", "Yes. Upgrades apply immediately; downgrades apply at the end of the billing period."],
              ["Is there a free trial?", "The Free plan is free forever. Paid plans can be cancelled anytime."],
              ["Which payment methods are accepted?", "Major credit cards. Invoicing is available on the Business plan."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </PublicLayout>
  );
}
