import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { founders } from "@/data/admin";
import { ArrowLeft, BriefcaseBusiness, Building2, CircleDollarSign, ExternalLink, Linkedin, LockKeyhole, Mail, MapPin, Phone, TrendingUp, UserRound, UsersRound } from "lucide-react";
import { useLocation, useParams } from "wouter";

function DataField({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl bg-[#FBFAF7] px-4 py-3"><p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#969BA3]">{label}</p><p className="mt-1.5 text-sm font-bold text-[#34415A]">{value || "Not provided"}</p></div>;
}

function Section({ title, description, icon: Icon, children }: { title: string; description?: string; icon: typeof UserRound; children: React.ReactNode }) {
  return <section className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(34,55,96,0.05)] sm:p-6"><div className="flex items-start gap-3 border-b border-[#243B6B]/8 pb-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FDE9A4] text-[#243B6B]"><Icon className="h-5 w-5" /></div><div><h2 className="text-lg font-bold text-[#243B6B]">{title}</h2>{description && <p className="mt-1 text-xs leading-5 text-[#858B95]">{description}</p>}</div></div><div className="mt-5">{children}</div></section>;
}

export default function AdminFounderProfile() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const founder = founders.find(item => item.id === Number(params.id));

  if (!founder) return <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center"><h1 className="font-display text-3xl text-[#243B6B]">Founder not found</h1><Button onClick={() => setLocation("/admin/cohort")} className="mt-5 rounded-xl bg-[#243B6B] text-white">Back to cohort</Button></div>;

  return (
    <div className="mx-auto max-w-[1260px] animate-page-in">
      <button onClick={() => setLocation("/admin/cohort")} className="flex items-center gap-2 text-xs font-bold text-[#687181] hover:text-[#243B6B]"><ArrowLeft className="h-4 w-4" /> Back to cohort</button>

      <section className="relative mt-5 overflow-hidden rounded-[28px] bg-[#243B6B] p-7 text-white sm:p-8">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[52px] border-[#DE3038]/85" />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5"><Avatar className="h-20 w-20 border-4 border-white/15"><AvatarFallback className="bg-[#FDE9A4] font-display text-2xl text-[#243B6B]">{founder.firstName[0]}{founder.lastName[0]}</AvatarFallback></Avatar><div><div className="flex flex-wrap items-center gap-2"><Badge className="border border-white/15 bg-white/10 text-[9px] font-bold uppercase tracking-[0.12em] text-white">{founder.cohort}</Badge><Badge className="border-0 bg-[#FDE9A4] text-[9px] font-bold uppercase tracking-[0.12em] text-[#243B6B]">{founder.profileCompletion}% complete</Badge></div><h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{founder.firstName} {founder.lastName}</h1><p className="mt-2 text-sm font-semibold text-white/70">{founder.title} at {founder.company}</p></div></div>
          <div className="flex flex-wrap gap-2"><Button onClick={() => window.location.href = `mailto:${founder.email}`} variant="outline" className="rounded-xl border-white/15 bg-white/10 text-xs font-bold text-white hover:bg-white/15"><Mail className="mr-2 h-4 w-4" /> Email founder</Button><Button onClick={() => window.open(`https://${founder.linkedin}`, "_blank")} className="rounded-xl bg-[#FDE9A4] text-xs font-bold text-[#243B6B] hover:bg-[#F8DF83]"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button></div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DataField label="2025 revenue" value={founder.annualRevenue2025} /><DataField label="2026 projected" value={founder.projectedRevenue2026} /><DataField label="Current valuation" value={founder.valuation} /><DataField label="Current employees" value={founder.employeeCount} />
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Section title="Founder information" icon={UserRound}>
          <div className="grid gap-3 sm:grid-cols-2"><DataField label="Email" value={founder.email} /><DataField label="Phone" value={founder.phone} /><DataField label="Location" value={founder.location} /><DataField label="Age" value={founder.age} /><DataField label="Current title" value={founder.title} /><DataField label="Last active" value={founder.lastActive} /></div>
          <div className="mt-4 flex flex-wrap gap-2">{founder.linkedin && <a href={`https://${founder.linkedin}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#EEF2F8] px-3 py-2 text-xs font-bold text-[#243B6B]">LinkedIn <ExternalLink className="h-3 w-3" /></a>}{founder.instagram && <a href={`https://${founder.instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#EEF2F8] px-3 py-2 text-xs font-bold text-[#243B6B]">Instagram <ExternalLink className="h-3 w-3" /></a>}{founder.twitter && <a href={`https://${founder.twitter}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#EEF2F8] px-3 py-2 text-xs font-bold text-[#243B6B]">X / Twitter <ExternalLink className="h-3 w-3" /></a>}</div>
        </Section>

        <Section title="Private demographics" description="Restricted to authorized Lightship staff." icon={LockKeyhole}>
          <div className="grid gap-3 sm:grid-cols-2"><DataField label="Gender" value={founder.gender} /><DataField label="Race / ethnicity" value={founder.raceEthnicity} /><DataField label="LGBTQIAP+" value={founder.lgbtqia} /><DataField label="Household income" value={founder.householdIncome} /></div>
        </Section>

        <Section title="Company details" icon={Building2}>
          <div className="grid gap-3 sm:grid-cols-2"><DataField label="Company" value={founder.company} /><DataField label="Website" value={founder.companyUrl} /><DataField label="Company EIN" value={founder.ein} /><DataField label="Industry" value={founder.industry} /><DataField label="Stage" value={founder.stage} /><DataField label="Year founded" value={founder.foundedYear} /><DataField label="Headquarters address" value={founder.headquartersAddress} /><DataField label="City" value={founder.headquartersCity} /><DataField label="State" value={founder.headquartersState} /><DataField label="ZIP code" value={founder.headquartersZip} /></div>
          {founder.otherCompanies.length > 0 && <div className="mt-5 border-t border-[#243B6B]/8 pt-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B9098]">Other companies founded</p><div className="mt-3 space-y-2">{founder.otherCompanies.map(company => <div key={company.name} className="flex items-center justify-between rounded-xl bg-[#FBFAF7] px-4 py-3"><span className="text-sm font-bold text-[#34415A]">{company.name}</span><span className="text-xs text-[#777F8B]">{company.website}</span></div>)}</div></div>}
        </Section>

        <Section title="Revenue & capital" icon={CircleDollarSign}>
          <div className="grid gap-3 sm:grid-cols-2"><DataField label="Annual revenue 2025" value={founder.annualRevenue2025} /><DataField label="YTD revenue 2026" value={founder.ytdRevenue2026} /><DataField label="Projected revenue 2026" value={founder.projectedRevenue2026} /><DataField label="Current valuation" value={founder.valuation} /><DataField label="Capital raised" value={founder.capitalRaised} /><DataField label="Fundraising status" value={founder.fundraisingStatus} /></div>
        </Section>

        <Section title="Team growth" icon={UsersRound}>
          <div className="grid gap-3 sm:grid-cols-3"><DataField label="Current employees" value={founder.employeeCount} /><DataField label="Hired in 2026" value={founder.employeesHired2026} /><DataField label="Expected hires" value={founder.expectedEmployeesToHire} /></div>
        </Section>

        <Section title="Support context" icon={TrendingUp}>
          <div className="grid gap-3 sm:grid-cols-2"><DataField label="Support areas" value={founder.supportAreas} /><DataField label="Joined dashboard" value={founder.joinedAt} /></div>
          <div className="mt-4 rounded-xl bg-[#FDE9A4]/55 p-4"><p className="text-xs font-bold text-[#243B6B]">Suggested Lightship follow-up</p><p className="mt-1 text-xs leading-5 text-[#5F6877]">Prioritize support around {founder.supportAreas.toLowerCase()} based on the founder’s current company stage and stated needs.</p></div>
        </Section>
      </div>
    </div>
  );
}
