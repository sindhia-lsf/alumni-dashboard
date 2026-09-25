import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlumniProfile, useAlumni } from "@/contexts/AlumniContext";
import { Building2, Camera, CheckCircle2, Link2, MapPin, Save, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { profile, updateProfile } = useAlumni();
  const [form, setForm] = useState<AlumniProfile>(profile);
  const update = (key: keyof AlumniProfile, value: string) => setForm(current => ({ ...current, [key]: value }));
  const save = () => {
    updateProfile(form);
    toast.success("Your profile has been updated.");
  };

  return (
    <div className="mx-auto max-w-[1180px] animate-page-in">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.17em] text-[#DE3038]">Your information</p><h1 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B]">Profile & company</h1><p className="mt-2 text-sm text-[#747B87]">Keep your founder story and business details current.</p></div>
        <Button onClick={save} className="h-11 rounded-xl bg-[#243B6B] px-5 font-bold text-white hover:bg-[#1D315D]"><Save className="mr-2 h-4 w-4" /> Save changes</Button>
      </div>

      <section className="relative overflow-hidden rounded-[26px] bg-[#243B6B] p-6 text-white sm:p-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_center,#FDE9A4_1px,transparent_1px)] bg-[length:18px_18px] opacity-15" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative"><Avatar className="h-24 w-24 border-4 border-white/15"><AvatarFallback className="bg-[#DE3038] text-2xl font-bold text-white">{form.firstName.charAt(0)}{form.lastName.charAt(0)}</AvatarFallback></Avatar><button onClick={() => toast.info("Photo upload will be connected to secure file storage.")} className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-4 border-[#243B6B] bg-[#FDE9A4] text-[#243B6B]"><Camera className="h-4 w-4" /></button></div>
          <div className="flex-1"><h2 className="font-display text-3xl">{form.firstName} {form.lastName}</h2><p className="mt-1 text-sm font-semibold text-[#FDE9A4]">{form.title} at {form.companyName}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60"><span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {form.location}</span><span className="flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5" /> {form.companyUrl}</span></div></div>
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:w-56"><div className="flex items-center justify-between text-xs font-bold"><span>Profile strength</span><span className="text-[#FDE9A4]">82%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[82%] rounded-full bg-[#FDE9A4]" /></div><p className="mt-3 text-[11px] leading-4 text-white/50">Add a profile photo to complete your profile.</p></div>
        </div>
      </section>

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList className="h-auto w-full justify-start gap-1 rounded-2xl bg-white p-1.5 shadow-[0_6px_25px_rgba(34,55,96,0.05)] sm:w-auto">
          <TabsTrigger value="personal" className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B] sm:flex-none"><UserRound className="mr-2 h-4 w-4" />Personal</TabsTrigger>
          <TabsTrigger value="company" className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B] sm:flex-none"><Building2 className="mr-2 h-4 w-4" />Company</TabsTrigger>
          <TabsTrigger value="metrics" className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B] sm:flex-none"><CheckCircle2 className="mr-2 h-4 w-4" />Business metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="personal"><FormCard title="Personal details" description="Information shown to members of the Lightship community."><div className="grid gap-5 sm:grid-cols-2"><Field label="First name" value={form.firstName} onChange={v => update("firstName", v)} /><Field label="Last name" value={form.lastName} onChange={v => update("lastName", v)} /><Field label="Email address" type="email" value={form.email} onChange={v => update("email", v)} /><Field label="Phone number" value={form.phone} onChange={v => update("phone", v)} /><Field label="Location" value={form.location} onChange={v => update("location", v)} /><Field label="LinkedIn" value={form.linkedIn} onChange={v => update("linkedIn", v)} /><div className="space-y-2 sm:col-span-2"><Label className="text-xs font-bold text-[#34415A]">Founder bio</Label><Textarea value={form.bio} onChange={e => update("bio", e.target.value)} className="min-h-28 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] p-4" /></div></div></FormCard></TabsContent>

        <TabsContent value="company"><FormCard title="Company details" description="Keep this current so peers and partners understand what you’re building."><div className="grid gap-5 sm:grid-cols-2"><Field label="Company name" value={form.companyName} onChange={v => update("companyName", v)} /><Field label="Your title" value={form.title} onChange={v => update("title", v)} /><Field label="Website" value={form.companyUrl} onChange={v => update("companyUrl", v)} /><SelectField label="Industry" value={form.industry} onChange={v => update("industry", v)} options={["Technology", "Health & Wellness", "Consumer", "Food & Beverage", "Financial Services", "Professional Services", "Manufacturing", "Other"]} /><Field label="Year founded" value={form.foundedYear} onChange={v => update("foundedYear", v)} /><SelectField label="Company stage" value={form.stage} onChange={v => update("stage", v)} options={["Idea / pre-launch", "Pre-revenue", "Early revenue", "Growth", "Established"]} /></div></FormCard></TabsContent>

        <TabsContent value="metrics"><FormCard title="Business metrics" description="Lightship uses these private data points to understand alumni progress and provide relevant support."><div className="grid gap-5 sm:grid-cols-2"><SelectField label="Employee count" value={form.employeeCount} onChange={v => update("employeeCount", v)} options={["Just me", "2–5", "6–10", "11–25", "26–50", "51+"]} /><SelectField label="Annual revenue" value={form.annualRevenue} onChange={v => update("annualRevenue", v)} options={["Pre-revenue", "Under $100K", "$100K–$250K", "$250K–$500K", "$500K–$1M", "$1M+"]} /><Field label="Capital raised to date" value={form.fundingRaised} onChange={v => update("fundingRaised", v)} /><SelectField label="Fundraising status" value={form.fundraisingStatus} onChange={v => update("fundraisingStatus", v)} options={["Not fundraising", "Exploring options", "Preparing to raise", "Actively raising", "Recently closed"]} /><div className="space-y-2 sm:col-span-2"><Label className="text-xs font-bold text-[#34415A]">12-month goals</Label><Textarea value={form.goals} onChange={e => update("goals", e.target.value)} className="min-h-28 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] p-4" /></div></div></FormCard></TabsContent>
      </Tabs>
    </div>
  );
}

function FormCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <div className="mt-5 rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)] sm:p-8"><div className="mb-7 border-b border-[#243B6B]/8 pb-5"><h3 className="text-lg font-bold text-[#243B6B]">{title}</h3><p className="mt-1 text-sm text-[#7C828D]">{description}</p></div>{children}</div>; }
function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <div className="space-y-2"><Label className="text-xs font-bold text-[#34415A]">{label}</Label><Input type={type} value={value} onChange={e => onChange(e.target.value)} className="h-11 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] px-4 shadow-none" /></div>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <div className="space-y-2"><Label className="text-xs font-bold text-[#34415A]">{label}</Label><select value={value} onChange={e => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-[#243B6B]/12 bg-[#FBFAF7] px-4 text-sm outline-none focus:ring-2 focus:ring-[#243B6B]/20">{options.map(option => <option key={option} value={option}>{option}</option>)}</select></div>; }
