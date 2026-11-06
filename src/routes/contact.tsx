import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PublicLayout, Section } from "@/components/rp/public-layout";
import { Field } from "@/components/rp/common";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RentalProof" },
      { name: "description", content: "Get in touch with the RentalProof team." },
      { property: "og:title", content: "Contact RentalProof" },
      { property: "og:description", content: "Questions about plans, demos or onboarding." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(100).optional(),
  subject: z.string().trim().min(3, "Enter a subject").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  return (
    <PublicLayout>
      <Section className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success">Contact</p>
          <h1 className="text-3xl font-semibold text-primary">Let's talk</h1>
          <p className="mt-3 text-muted-foreground">Questions about plans, onboarding or a demo for your team? We usually reply within one business day.</p>
          <div className="mt-8 space-y-3 text-sm">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-success" /> hello@rentalproof.example</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-success" /> Remote-first team</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-card">
          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
              <h2 className="mt-4 text-lg font-semibold text-primary">Message sent</h2>
              <p className="mt-1 text-sm text-muted-foreground">Demo only — no message was actually delivered.</p>
              <Button variant="outline" className="mt-6" onClick={() => { reset(); setSent(false); }}>Send another</Button>
            </div>
          ) : (
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={handleSubmit(async () => { await new Promise((r) => setTimeout(r, 600)); setSent(true); })}
            >
              <Field label="Name" error={errors.name?.message}><Input {...register("name")} /></Field>
              <Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></Field>
              <Field label="Company" error={errors.company?.message}><Input {...register("company")} /></Field>
              <Field label="Subject" error={errors.subject?.message}><Input {...register("subject")} /></Field>
              <div className="sm:col-span-2">
                <Field label="Message" error={errors.message?.message}><Textarea rows={5} {...register("message")} /></Field>
              </div>
              <Button type="submit" variant="success" className="sm:col-span-2" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>
      </Section>
    </PublicLayout>
  );
}
