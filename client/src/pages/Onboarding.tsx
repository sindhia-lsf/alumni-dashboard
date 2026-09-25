import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlumniProfile, useAlumni } from "@/contexts/AlumniContext";
import { ArrowLeft, ArrowRight, Check, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const stepCopy = [
  { number: "01", title: "About you", description: "The basics that help alumni connect with you." },
  { number: "02", title: "Your company", description: "A snapshot of what you’re building right now." },
  { number: "03", title: "Your journey", description: "Tell us where Lightship can be most useful." },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { profile, updateProfile, login } = useAlumni();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AlumniProfile>(profile);

  const update = (key: keyof Omit<AlumniProfile, "otherCompanies">, value: string) => setForm(current => ({ ...current, [key]: value }));

  const next = () => {
    const valid = step === 0 ? form.firstName && form.lastName && form.email : step === 1 ? form.companyName && form.title && form.industry : form.cohortCity && form.cohortYear;
    if (!valid) {
      toast.error("Complete the required fields before continuing.");
      return;
    }
    setStep(current => Math.min(2, current + 1));
  };

  const finish = () => {
    updateProfile(form);
    login();
    toast.success("Your alumni profile is ready.");
    setLocation("/home");
  };

  return (
    <main className="min-h-screen bg-[#F4F2EC] lg:grid lg:grid-cols-[360px_1fr]">
      <aside className="relative overflow-hidden bg-[#243B6B] px-7 py-7 text-white sm:px-10 lg:flex lg:min-h-screen lg:flex-col lg:px-9 lg:py-10">
        <div className="absolute -bottom-24 -left-28 h-80 w-80 rounded-full border-[64px] border-[#DE3038]/80" />
        <div className="relative z-10"><BrandMark inverse /></div>
        <div className="relative z-10 mt-12 hidden flex-1 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FDE9A4]">Join the community</p>
          <h1 className="mt-4 font-display text-4xl leading-tight">Let’s build your founder profile.</h1>
          <div className="mt-12 space-y-7">
            {stepCopy.map((item, index) => (
              <div key={item.number} className="flex gap-4">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs font-bold ${index < step ? "border-[#FDE9A4] bg-[#FDE9A4] text-[#243B6B]" : index === step ? "border-white bg-white text-[#243B6B]" : "border-white/20 text-white/35"}`}>
                  {index < step ? <Check className="h-4 w-4" /> : item.number}
                </div>
                <div className={index <= step ? "opacity-100" : "opacity-35"}>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setLocation("/")} className="relative z-10 mt-7 hidden items-center gap-2 text-xs font-semibold text-white/55 hover:text-white lg:flex"><ArrowLeft className="h-4 w-4" /> Back to sign in</button>
      </aside>

      <section className="flex min-h-[calc(100vh-88px)] items-center px-5 py-10 sm:px-10 lg:min-h-screen lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#DE3038]">Step {step + 1} of 3</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B]">{stepCopy[step].title}</h2>
            </div>
            <span className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#657084] shadow-sm sm:block">About 3 minutes</span>
          </div>
          <div className="mb-9 h-1.5 overflow-hidden rounded-full bg-[#243B6B]/10"><div className="h-full rounded-full bg-[#DE3038] transition-all duration-300" style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>

          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" required value={form.firstName} onChange={value => update("firstName", value)} />
              <Field label="Last name" required value={form.lastName} onChange={value => update("lastName", value)} />
              <Field label="Email address" required type="email" value={form.email} onChange={value => update("email", value)} />
              <Field label="Phone number" value={form.phone} onChange={value => update("phone", value)} />
              <Field label="Age" type="number" value={form.age} onChange={value => update("age", value)} />
              <Field label="City, state" value={form.location} onChange={value => update("location", value)} placeholder="Cincinnati, OH" />
              <div className="sm:col-span-2"><Field label="LinkedIn profile" value={form.linkedIn} onChange={value => update("linkedIn", value)} placeholder="linkedin.com/in/yourname" /></div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company name" required value={form.companyName} onChange={value => update("companyName", value)} />
              <Field label="Your title" required value={form.title} onChange={value => update("title", value)} placeholder="Founder & CEO" />
              <Field label="Company website" value={form.companyUrl} onChange={value => update("companyUrl", value)} placeholder="yourcompany.com" />
              <SelectField label="Industry" required value={form.industry} onChange={value => update("industry", value)} options={["Technology", "Health & Wellness", "Consumer", "Food & Beverage", "Financial Services", "Professional Services", "Manufacturing", "Other"]} />
              <SelectField label="Company stage" value={form.stage} onChange={value => update("stage", value)} options={["Idea / pre-launch", "Pre-revenue", "Early revenue", "Growth", "Established"]} />
              <Field label="Year founded" value={form.foundedYear} onChange={value => update("foundedYear", value)} />
              <SelectField label="Team size" value={form.employeeCount} onChange={value => update("employeeCount", value)} options={["Just me", "2–5", "6–10", "11–25", "26–50", "51+"]} />
              <SelectField label="Annual revenue" value={form.annualRevenue} onChange={value => update("annualRevenue", value)} options={["Pre-revenue", "Under $100K", "$100K–$250K", "$250K–$500K", "$500K–$1M", "$1M+"]} />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField label="Bootcamp city" required value={form.cohortCity} onChange={value => update("cohortCity", value)} options={["Akron", "Cincinnati", "Cleveland", "Columbus", "Dayton", "Marietta", "Toledo", "Youngstown", "Other"]} />
              <SelectField label="Cohort year" required value={form.cohortYear} onChange={value => update("cohortYear", value)} options={["2026", "2025", "2024", "2023", "2022", "2021", "2020", "Earlier"]} />
              <div className="sm:col-span-2 space-y-2">
                <Label className="text-xs font-bold text-[#2D3C55]">What are your top goals for the next 12 months?</Label>
                <Textarea value={form.goals} onChange={e => update("goals", e.target.value)} className="min-h-28 rounded-xl border-[#243B6B]/15 bg-white p-4 shadow-none" placeholder="Tell us what you’re focused on..." />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label className="text-xs font-bold text-[#2D3C55]">Where could you use support?</Label>
                <Input value={form.supportAreas} onChange={e => update("supportAreas", e.target.value)} className="h-12 rounded-xl border-[#243B6B]/15 bg-white px-4 shadow-none" placeholder="Fundraising, marketing, hiring, operations..." />
              </div>
              <div className="sm:col-span-2 flex gap-3 rounded-2xl bg-[#FDE9A4]/55 p-4 text-sm leading-6 text-[#344465]"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#DE3038]" /> We’ll use these details to personalize resources, connections, and opportunities across the alumni network.</div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-[#243B6B]/10 pt-6">
            <Button variant="ghost" onClick={() => step === 0 ? setLocation("/") : setStep(value => value - 1)} className="rounded-xl text-[#536077]"><ArrowLeft className="mr-2 h-4 w-4" /> {step === 0 ? "Sign in" : "Back"}</Button>
            {step < 2 ? (
              <Button onClick={next} className="h-11 rounded-xl bg-[#243B6B] px-6 font-bold text-white hover:bg-[#1D315D]">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
            ) : (
              <Button onClick={finish} className="h-11 rounded-xl bg-[#DE3038] px-6 font-bold text-white hover:bg-[#C52730]">Create my profile <Check className="ml-2 h-4 w-4" /></Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, required, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return <div className="space-y-2"><Label className="text-xs font-bold text-[#2D3C55]">{label}{required && <span className="text-[#DE3038]"> *</span>}</Label><Input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="h-12 rounded-xl border-[#243B6B]/15 bg-white px-4 shadow-none focus-visible:ring-[#243B6B]/25" /></div>;
}

function SelectField({ label, value, onChange, options, required }: { label: string; value: string; onChange: (value: string) => void; options: string[]; required?: boolean }) {
  return <div className="space-y-2"><Label className="text-xs font-bold text-[#2D3C55]">{label}{required && <span className="text-[#DE3038]"> *</span>}</Label><select value={value} onChange={e => onChange(e.target.value)} className="h-12 w-full rounded-xl border border-[#243B6B]/15 bg-white px-4 text-sm text-[#26354F] outline-none focus:ring-2 focus:ring-[#243B6B]/20"><option value="">Select an option</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></div>;
}
